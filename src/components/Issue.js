import React, { Component } from 'react'
import Redux from 'redux'
import { connect } from 'react-redux'
import web3 from '../ethereum/web3'
import Spinner from 'react-spinkit'
import {
  Table,
  Icon,
  Button,
  Dimmer,
  Loader,
  Segment,
  Accordion
} from 'semantic-ui-react'

import { LOADED, LOADING_ISSUES } from '../types'
import {
  getIssues,
  acceptIssue,
  settleIssue
} from '../actions/contractActions'

class Issue extends Component {
  render() {
    if (this.props.loading === LOADING_ISSUES) <p>loading</p>

    return this.renderIssueDetails(this.props.issues)
  }

  constructor(props) {
    super(props)

    this.state = {
      awardAmount: 0,
      activeIssue: 0
    }
  }

  async componentDidMount() {
    return this.props.getIssues(this.props.disputeAddress)

  }

  setActiveIssue = activeIssue => {
    this.setState({ activeIssue })
  }

  renderIssueDetails = issues => {
    const { loading, user } = this.props

    return issues.map((issue, index) => {
      if (loading) {
        return(
          <Dimmer active>
            <Loader size="massive">{loading}... This normally takes about 15 seconds</Loader>
          </Dimmer>
        )
      }

      return(
        <Accordion styled>
          <Accordion.Title
            active={this.state.activeIssue === index}
            onClick={() => this.setActiveIssue(index)}
          >
            <h3><Icon name='balance scale' />{issue.title}</h3>
          </Accordion.Title>
          <Accordion.Content active={this.state.activeIssue === index}>
            <Table celled striped>
              <Table.Body>
                <Table.Row>
                  <Table.Cell collapsing>
                    <Icon name='user circle' /> Submitter
                  </Table.Cell>
                  <Table.Cell>{issue.submitter}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Icon name='user circle' /> Respondent
                  </Table.Cell>
                  <Table.Cell>{issue.acceptor}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Icon name='gavel' /> Arbitrator
                  </Table.Cell>
                  <Table.Cell>{issue.arbitrator}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                     Arbitrator Fee
                  </Table.Cell>
                  <Table.Cell>
                    {web3.utils.fromWei(issue.arbitratorFee, 'ether')} eth
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                     Issue Stake
                  </Table.Cell>
                  <Table.Cell>
                    {web3.utils.fromWei(issue.funds, 'ether')} eth
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Accepted
                  </Table.Cell>
                  <Table.Cell>
                    {issue.accepted ?
                        <Icon color='green' name='checkmark' size='large' /> :
                        <Icon color='yellow' name='close' size='large' />
                    }
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Decided
                  </Table.Cell>
                  <Table.Cell>
                    {issue.settled ?
                      <Icon color='green' name='checkmark' size='large' /> :
                      <Icon color='yellow' name='close' size='large' />
                    }
                  </Table.Cell>
                </Table.Row>
              </Table.Body>

            <Table.Footer fullWidth>
              <Table.Row collapsing>
                { user === issue.respondent && !issue.accepted &&
                  <Table.HeaderCell colSpan='4'>
                    <Button
                      inverted
                      size='small'
                      color='green'
                      onClick={this.acceptIssue}
                      id={index}
                    >
                      Accept
                    </Button>
                  </Table.HeaderCell>
                }
              </Table.Row>
              <Table.Row>
                { user === issue.arbitrator &&
                  <Table.HeaderCell colSpan='4'>
                  sdfsdfsdfasdf
                    <Button size='small'>Approve</Button>
                    <Button disabled size='small'>Approve All</Button>
                  </Table.HeaderCell>
                }
              </Table.Row>
            </Table.Footer>
          </Table>
        </Accordion.Content>
      </Accordion>

      )
    })
  }

  handleInputChange = event => {
    const { id, value } = event.target
    this.setState({ [id]: value })
  }

  acceptIssue = event => {
    console.log(event)
    const { acceptIssue, disputeAddress, userAddress, issues } = this.props
    const { id: issueIndex } = event.target
    const stake = issues[issueIndex].funds

    acceptIssue(userAddress, disputeAddress, issueIndex, stake)
  }

  settleIssue = (event, winnerAddress) => {
    const { disputeAddress, settleIssue, userAddress } = this.props
    const { id: issueIndex } = event.target
    const { awardAmount } = this.state

    settleIssue(
      userAddress,
      disputeAddress,
      issueIndex,
      winnerAddress,
      awardAmount
    )
  }
}

const mapStateToProps = state => {
  return {
    issues: state.issues
  }
}

export default connect(mapStateToProps, {
  getIssues,
  acceptIssue,
  settleIssue
})(Issue)

// <div key={index + '-' + this.props.disputeAddress}>
//   <h3>Issue: {issue.title}</h3>
//   <h3>submitter: {issue.submitter}</h3>
//   <h3>acceptor: {issue.acceptor}</h3>
//   <h3>arbitrator: {issue.arbitrator}</h3>
//   <h3>arbitratorFee: {web3.utils.fromWei(issue.arbitratorFee)} eth</h3>
//   <h3>accepted: {issue.accepted ? 'true' : 'false'}</h3>
//   <h3>resolved: {issue.resolved ? 'true' : 'false'}</h3>
//   <h3>funds: {web3.utils.fromWei(issue.funds, 'ether')} eth</h3>
//   <button id={index} onClick={this.acceptIssue}>accept</button>
//   <input
//     type="number"
//     value={this.state.awardAmount}
//     onChange={this.handleInputChange}
//     id="awardAmount"
//   />
//   Settle
//   <button
//     id={index}
//     onClick={e => this.settleIssue(e, issue.submitter)}
//   >
//     submitter ({issue.submitter})
//   </button>
//   <button
//     id={index}
//     onClick={e => this.settleIssue(e, issue.acceptor)}
//   >
//     acceptor ({issue.acceptor})
//   </button>
// </div>
