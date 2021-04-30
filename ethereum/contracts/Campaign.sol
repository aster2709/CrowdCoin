//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract CampaignFactory {
    address[] public campaigns;
    function createCampaign(uint _minContribution) public {
        address newCampaign = address(new Campaign(_minContribution));
        campaigns.push(newCampaign);
    }
    function getDeployedCampaigns() public view returns(address[] memory) {
        return campaigns;
    }
}

contract Campaign {
    address public manager;
    uint public minContribution;
    struct Request {
        string desc;
        uint amount;
        uint approveCount;
        address recipient;
        bool completed;
        mapping (address => bool) approvals;
    }
    Request[] public requests;
    mapping (address => bool) public approvers;
    uint public approverCount;
    modifier onlyManager {
        require(msg.sender == manager, "not the manager");
        _;
    }
    modifier isApprover {
        require(approvers[msg.sender], "not an approver");
        _;
    }
    constructor(uint _minContribution) {
        manager = tx.origin;
        minContribution = _minContribution;
    }
    function contribute() public payable {
        require(msg.value >= minContribution, "less than minimum contribution");
        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approverCount++;
        }
    }
    function createRequest(string memory _desc, uint _amount, address _recipient) public {
        requests.push();
        Request storage request = requests[requests.length - 1];
        request.desc = _desc;
        request.amount = _amount;
        request.recipient = _recipient;
    }
    function approveRequest(uint _index) public isApprover {
        Request storage request = requests[_index];
        require(!request.completed, "request already completed");
        require(!request.approvals[msg.sender], "already voted for this request");
        request.approveCount++;
        request.approvals[msg.sender] = true;
    }
    function finalizeRequest(uint _index) public onlyManager {
        Request storage request = requests[_index];
        require(!request.completed, "request already completed");
        require(request.approveCount > (approverCount/2),"not enough votes to execute request");
        payable(request.recipient).transfer(request.amount);
        request.completed = true;
    }
    function getSummary() public view returns(uint, uint, uint, uint, address) {
        return (minContribution, address(this).balance, requests.length, approverCount, manager);
    }
    function getRequestCount() public view returns(uint) {
        return requests.length;
    }
}