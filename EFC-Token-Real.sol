// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Efikcoin {
    string public name = "Efikcoin";
    string public symbol = "EFC";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000000 * 10**18; // 1B EFC Real Value
    address public treasury = 0x676cCf34C191a9D6EFE4B265b84877C619A559d0;
    address public founder = 0xC5AD5cfcF81AD63a94227334b898eafCe6B27cCA;

    mapping(address => uint256) public balanceOf;

    constructor() {
        balanceOf[treasury] = totalSupply; // Treasury holds 1B EFC for real value
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        require(balanceOf[msg.sender] >= amount);
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }
}
