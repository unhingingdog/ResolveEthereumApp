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
  Input,
  Accordion,
  Label
} from 'semantic-ui-react'

import {
  LOADED,
  LOADING_ISSUES,
  ACCEPTING_ISSUE,
  SETTLING_ISSUE
} from '../types'

import {
  getIssues,
  acceptIssue,
  settleIssue
} from '../actions/contractActions'

class Issue extends Component {
  render() {
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

  async componentDidUpdate(prevProps) {
    const { getIssues, disputeAddress} = this.props
    if (prevProps.loading === ACCEPTING_ISSUE) getIssues(disputeAddress)
    if (prevProps.loading === SETTLING_ISSUE) getIssues(disputeAddress)
  }

  setActiveIssue = activeIssue => {
    this.setState({ activeIssue })
  }

  renderIssueDetails = issues => {
    const { loading, user } = this.props

    return issues.map((issue, index) => {
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
                    {web3.utils.fromWei(issue.arbitratorFee, 'ether')} ETH
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                     Issue Stake
                  </Table.Cell>
                  <Table.Cell>
                    {web3.utils.fromWei(issue.funds, 'ether')} ETH
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
                    {issue.resolved ?
                      <Icon color='green' name='checkmark' size='large' /> :
                      <Icon color='yellow' name='close' size='large' />
                    }
                  </Table.Cell>
                </Table.Row>
              </Table.Body>

            <Table.Footer fullWidth>
              <Table.Row collapsing>
                { user === issue.acceptor && !issue.accepted &&
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
                { user === issue.arbitrator && !issue.resolved &&
                  <Table.HeaderCell colSpan='4'>
                    <Input
                      label="Award amount"
                      type="number"
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
                        onClick={(e => this.settleIssue(e, issue.submitter))}
                        id={index}
                      >
                        {issue.submitter.substr(0, 8)}
                      </Button>
                      <Button.Or />
                      <Button
                        positive
                        onClick={e => this.settleIssue(e, issue.acceptor)}
                        id={index}
                      >
                        {issue.acceptor.substr(0, 8)}
                      </Button>
                    </Button.Group>
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
    const { acceptIssue, disputeAddress, user, issues } = this.props
    const { id: issueIndex } = event.target
    const stake = issues[issueIndex].funds

    acceptIssue(user, disputeAddress, issueIndex, stake)
  }

  settleIssue = (event, winnerAddress) => {
    const { disputeAddress, settleIssue, user } = this.props
    const { id: issueIndex } = event.target
    const { awardAmount } = this.state

    settleIssue(
      user,
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
