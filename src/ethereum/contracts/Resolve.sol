pragma solidity ^0.4.17;

contract DisputeFactory {
    mapping(address => address[]) public userDisputes;

    function createDispute(address _respondent) public {
        address dispute = new Dispute(msg.sender, _respondent);
        userDisputes[msg.sender].push(dispute);
        userDisputes[_respondent].push(dispute);
    }

    function getUserDisputes(address _user) public constant returns (address[] disputes) {
      return userDisputes[_user];
    }
}

contract Dispute {
    struct Issue {
        string title;
        address submitter;
        address acceptor;
        address arbitrator;
        uint arbitratorFee;
        bool accepted;
        bool resolved;
        uint funds;
    }

    uint totalFunds;
    address public initiator;
    address public respondent;
    Issue[] public issues;

    modifier restricted() {
        require(msg.sender == initiator || msg.sender == respondent);
        _;
    }


    function Dispute(address _initiator, address _respondent) public {
        initiator = _initiator;
        respondent = _respondent;
    }

    function createIssue(
        string _title,
        address _arbitrator,
        uint _arbitratorFee
    ) public restricted payable {
        address _acceptor;

        if (msg.sender == initiator) {
            _acceptor = respondent;
        } else {
            _acceptor = initiator;
        }

        Issue memory newIssue = Issue({
            title: _title,
            submitter: msg.sender,
            acceptor: _acceptor,
            arbitrator: _arbitrator,
            arbitratorFee: _arbitratorFee,
            accepted: false,
            resolved: false,
            funds: msg.value
        });

        issues.push(newIssue);
    }

    function acceptIssue(uint _issueIndex) public restricted payable {
        Issue storage issue = issues[_issueIndex];
        require(msg.value >= issue.funds);
        require(msg.sender == issue.acceptor);

        issue.funds += msg.value;
        issue.accepted = true;
    }

    function settleIssue(uint _issueIndex, address _winner, uint _award) public {
        Issue storage issue = issues[_issueIndex];

        require(msg.sender == issue.arbitrator);
        require(!issue.resolved && issue.accepted);
        require(_winner == issue.submitter || _winner == issue.acceptor);
        require(_award + issue.arbitratorFee <= issue.funds);

        issue.resolved = true;
        issue.arbitrator.transfer(issue.arbitratorFee);
        issue.funds -= issue.arbitratorFee;

        issue.funds -= _award;
        _winner.transfer(_award);

        if (_winner == issue.submitter) {
            issue.acceptor.transfer(issue.funds);
        } else {
            issue.submitter.transfer(issue.funds);
        }
        issue.funds = 0;
    }

    function getIssue(uint _issueIndex) public constant returns (
        address,
        address,
        address,
        uint,
        bool,
        bool,
        uint
    ){
        return (
            issues[_issueIndex].submitter,
            issues[_issueIndex].acceptor,
            issues[_issueIndex].arbitrator,
            issues[_issueIndex].arbitratorFee,
            issues[_issueIndex].accepted,
            issues[_issueIndex].resolved,
            issues[_issueIndex].funds
        );
    }

    function getIssueTitle(uint _issueIndex) public constant returns (string title) {
        return issues[_issueIndex].title;
    }

    function getIssuesCount() public constant returns (uint count) {
        return issues.length;
    }
}
