const assert = require('assert')
const expect = require('chai').expect
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const compiledFactory = require('../src/ethereum/build/DisputeFactory.json')
const compiledDispute = require('../src/ethereum/build/Dispute.json')

let accounts
let factory
let disputeAddress
let dispute
let disputeInitiatorAccount
let disputeRespondentAccount
let arbitratorAccount

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()
  disputeInitiatorAccount = accounts[0]
  disputeRespondentAccount = accounts[1]
  arbitratorAccount = accounts[2]

  factory = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
  .deploy({ data: compiledFactory.bytecode})
  .send({ from: disputeInitiatorAccount, gas: '5000000' })

  await factory.methods.createDispute(disputeRespondentAccount).send({
    from: disputeInitiatorAccount,
    gas: '1000000'
  })

  ;[disputeAddress] = await factory.methods.getUserDisputes(
      disputeInitiatorAccount
  ).call()

  dispute = await new web3.eth.Contract(
    JSON.parse(compiledDispute.interface),
    disputeAddress
  )
})

it('Deploys a factory and a dispute', () => {
  assert(factory.options.address)
  assert(dispute.options.address)
})

it('associates the dispute with the parties addresses', async () => {
  const deployedForInitiator = await factory.methods.getUserDisputes(
      disputeInitiatorAccount
  ).call()

  const deployedForRespondent = await factory.methods.getUserDisputes(
      disputeInitiatorAccount
  ).call()

  assert.equal(deployedForInitiator.length, 1)
  assert.equal(deployedForRespondent.length, 1)
  assert(deployedForInitiator[0] === deployedForRespondent[0])
})


describe('Issue', () => {
  let issue
  let issueInitiator
  let issueAcceptor

  beforeEach(async () => {
    issueInitiator = disputeInitiatorAccount
    issueAcceptor = disputeRespondentAccount

    await dispute.methods.createIssue(
      "Stock Quote Inaccurate",
      arbitratorAccount,
      web3.utils.toWei('0.5', 'ether')
    )
    .send({
      from: issueInitiator,
      value: web3.utils.toWei('2', 'ether'),
      gas: '1000000'
     })

     issue = await dispute.methods.issues(0).call()
  })

  it('creates issues', async () => {
    assert(issue)
  })

  it('correctly sets the issue attributes', () => {
    assert.equal(
      issue.title,
      "Stock Quote Inaccurate"
    )
    assert.equal(issue.submitter, issueInitiator)
    assert.equal(issue.acceptor, issueAcceptor)
    assert.equal(issue.arbitrator, arbitratorAccount)
    assert.equal(issue.arbitratorFee, web3.utils.toWei('0.5', 'ether'))
    assert.equal(issue.accepted, false)
    assert.equal(issue.resolved, false)
    assert.equal(issue.funds, web3.utils.toWei('2', 'ether'))
  })


  it('does not allow third parties to create an issue', async () => {
    let failure
    try {
      await dispute.methods.createIssue(
        "Stock Quote Inaccurate",
        "The estimate of the stock in trade was alledly misrepresented...",
        arbitratorAccount,
        web3.utils.toWei('0.5', 'ether')
      )
      .send({
        from: accounts[4],
        value: web3.utils.toWei('2', 'ether'),
        gas: '1000000'
       })
    } catch (err) {
      failure = err
    }
    assert(failure)
  })

  it('allows the acceptor to accept the issue', async () => {
    await dispute.methods.acceptIssue(0).send({
      from: issueAcceptor,
      value: web3.utils.toWei('2', 'ether'),
      gas: '2100000',
      gasPrice: "1"
    })

    issue = await dispute.methods.issues(0).call()
    assert.equal(issue.accepted, true)
  })

  it('only allows the specified acceptor to accept an issue', async () => {
    let failure
    try {
      await dispute.methods.acceptIssue(0).send({
        from: accounts[4],
        value: web3.utils.toWei('2', 'ether'),
        gas: '1000000'
      })
    } catch (err) {
      failure = err
    }
    assert(failure)
  })

  it("requires the acceptor to match the submitter's payment", async () => {
    let failure
    try {
      await dispute.methods.acceptIssue(0).send({
        from: issueAcceptor,
        value: web3.utils.toWei('1', 'ether'),
        gas: '1000000'
      })
    } catch (err) {
      failure = err
    }
    assert(failure)
  })

  describe("Settling the dispute", () => {
    let initialArbitratorBalance
    let initialWinnerBalance //issue/disputeInitiator in this case
    let initialLoserBalance//issueAcceptor in this case
    let award
    let remainingFunds
    let initialIssueFunds

    beforeEach(async () => {
      await dispute.methods.acceptIssue(0).send({
        from: issueAcceptor,
        value: web3.utils.toWei('2', 'ether'),
        gas: '2100000',
        gasPrice: "1"
      })

      initialArbitratorBalance = parseInt(await web3.eth.getBalance(arbitratorAccount))
      initialWinnerBalance = parseInt(await web3.eth.getBalance(issueInitiator))
      initialLoserBalance = parseInt(await web3.eth.getBalance(issueAcceptor))

      award = parseInt(web3.utils.toWei('3', 'ether'))
    })

    it("allows the arbitrator to settle the issue", async () => {
      await dispute.methods.settleIssue(0, issueInitiator, award)
        .send({
          from: arbitratorAccount,
          gas: '2100000',
          gasPrice: "1"
        })
      issue = await dispute.methods.issues(0).call()

      assert(issue.resolved)
    })

    it("only allows the arbitrator to settle the issue", async () => {
      let failure

      try {
        await dispute.methods.settleIssue(0, issueInitiator, award)
          .send({
            from: issueInitiator,
            gas: '2100000',
            gasPrice: "1"
          })
      } catch(err) {
        failure = err
      }
      assert(failure)
    })

    it("pays out to the parties correctly", async () => {
      await dispute.methods.settleIssue(0, issueInitiator, award)
        .send({
          from: arbitratorAccount,
          gas: '2100000',
          gasPrice: "1"
        })
      issue = await dispute.methods.issues(0).call()

      assert(
        await web3.eth.getBalance(arbitratorAccount) >
          initialArbitratorBalance + (parseInt(issue.arbitratorFee) * 0.99)
      )
      assert(
        await web3.eth.getBalance(issueInitiator) >
          initialWinnerBalance + (award * 0.99)
      )

      const remaining = parseInt(web3.utils.toWei('4', 'ether'))
        - (parseInt(issue.arbitratorFee) + award)

      assert(
        await web3.eth.getBalance(issueAcceptor) >
          (initialLoserBalance + remaining) * 0.99
      )
    })

    it("pays out all of the issue funds when settled", async () => {
      await dispute.methods.settleIssue(0, issueInitiator, award)
        .send({
          from: arbitratorAccount,
          gas: '2100000',
          gasPrice: "1"
        })

      issue = await dispute.methods.issues(0).call()
      const remainingContractBalance =
        parseInt(await web3.eth.getBalance(disputeAddress))

      assert.equal(remainingContractBalance, 0)
      assert.equal(parseInt(issue.funds), 0)
    })
  })
})
