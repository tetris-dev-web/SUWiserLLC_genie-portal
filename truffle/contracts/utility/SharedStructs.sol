pragma solidity ^0.4.24;

library SharedStructs {
  struct Investor {
    address addr;
    uint256 id;
    uint256 voteCredit;
    //maps from projectId to number of votes for that project
    mapping(uint256 => uint256) votes;
  }
}
