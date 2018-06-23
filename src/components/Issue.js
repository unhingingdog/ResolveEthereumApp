import React, { Component } from 'react'
import { Table, Icon, Button, Input, Label } from 'semantic-ui-react'
import web3 from '../ethereum/web3'

export default class Issue extends Component {

  render() {
    const { issueDetails, user, index } = this.props

    if (issueDetails) return(
      <Table celled striped>
        <Table.Body>
          <Table.Row>
            <Table.Cell collapsing>
              <Icon name='user circle' /> Submitter
            </Table.Cell>
            <Table.Cell>{issueDetails.submitter}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name='user circle' /> Respondent
            </Table.Cell>
            <Table.Cell>{issueDetails.acceptor}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name='gavel' /> Arbitrator
            </Table.Cell>
            <Table.Cell>{issueDetails.arbitrator}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
               Arbitrator Fee
            </Table.Cell>
            <Table.Cell>
              {web3.utils.fromWei(issueDetails.arbitratorFee, 'ether')} ETH
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
               Issue Stake
            </Table.Cell>
            <Table.Cell>
              {web3.utils.fromWei(issueDetails.funds, 'ether')} ETH
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              Accepted
            </Table.Cell>
            <Table.Cell>
              {issueDetails.accepted ?
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
              {issueDetails.resolved ?
                <Icon color='green' name='checkmark' size='large' /> :
                <Icon color='yellow' name='close' size='large' />
              }
            </Table.Cell>
          </Table.Row>
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row collapsing>
            { user === issueDetails.acceptor && !issueDetails.accepted &&
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
            { user === issueDetails.arbitrator && !issueDetails.resolved &&
              <Table.HeaderCell colSpan='4'>
                <Input
                  label="Award amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={this.state.awardAmount}
                  onChange={this.handleInputChange}
                  id="awardAmount"
                >
                  <Label basic>Award</Label>
                  <input />
                  <Label>ETH</Label>
                </Input>
                <Button.Group floated='right'>
                  <Button
                    primary
                    onClick={(e => this.settleIssue(e, issueDetails.submitter))}
                    id={index}
                  >
                    {issueDetails.submitter.substr(0, 8)}
                  </Button>
                  <Button.Or />
                  <Button
                    positive
                    onClick={e => this.settleIssue(e, issueDetails.acceptor)}
                    id={index}
                  >
                    {issueDetails.acceptor.substr(0, 8)}
                  </Button>
                </Button.Group>
              </Table.HeaderCell>
            }
          </Table.Row>
        </Table.Footer>
      </Table>
    )

    return <p>'loading'</p>
  }

  constructor(props) {
    super(props)

    this.state = {
      awardAmount: web3.utils.fromWei(this.props.issueDetails.funds, 'ether')
    }
  }

  handleInputChange = event => {
    const { id, value } = event.target
    this.setState({ [id]: value })
  }

  acceptIssue = event => {
    const { acceptIssue, disputeAddress, user, issueDetails } = this.props
    const { id: issueIndex } = event.target
    const stake = web3.utils.fromWei(issueDetails.funds, 'ether')

    acceptIssue(user, disputeAddress, issueIndex, stake)
  }

  settleIssue = (event, winnerAddress) => {
    const { disputeAddress, settleIssue, user, index } = this.props
    const { awardAmount } = this.state

    settleIssue(
      user,
      disputeAddress,
      index,
      winnerAddress,
      awardAmount
    )
  }
}
