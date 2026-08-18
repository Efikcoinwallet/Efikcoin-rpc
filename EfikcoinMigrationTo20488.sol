// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IEFC {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract EfikcoinMigrationTo20488 {
    address public constant EFC_BEP20 = 0x677Ce9CBa67f7484ea951a12897CE780cFd8fED1;
    address public founder = 0xC5AD5cfcF81AD63a94227334b898eafCe6B27cCA;
    uint256 public constant CHAIN_ID_20488 = 20488;
    
    mapping(address => uint256) public migratedTo20488;
    uint256 public totalMigrated;
    
    event MigratedToMainnet(address indexed user, uint256 amount, uint256 chainId);
    
    function migrateToMainnet(uint256 amount) external {
        require(amount > 0, "0 amount");
        require(IEFC(EFC_BEP20).transferFrom(msg.sender, address(this), amount), "transfer failed");
        migratedTo20488[msg.sender] += amount;
        totalMigrated += amount;
        emit MigratedToMainnet(msg.sender, amount, CHAIN_ID_20488);
    }
    
    function withdrawForBridge(address to, uint256 amount) external {
        require(msg.sender == founder, "only founder");
        IEFC(EFC_BEP20).transfer(to, amount);
    }
}
