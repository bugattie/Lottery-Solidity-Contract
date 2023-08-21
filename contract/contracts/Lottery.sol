// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender;
    }

    function addPlayers() public payable {
        // By writing ether, 0.01 will internally be converted to some amount of wei, because remember msg.value will contain amount in wei
        require(msg.value > 0.01 ether);

        players.push(msg.sender);
    }

    function generateRandomNumber() private view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(
                        blockhash(block.number - 1),
                        block.timestamp
                    )
                )
            );
    }

    function pickWinner() public restricted {
        uint index = generateRandomNumber() % players.length;
        address payable playerAddress = payable(players[index]);

        uint contractBalance = address(this).balance;

        require(contractBalance > 0, "Contract balance is zero");

        playerAddress.transfer(address(this).balance);
        players = new address[](0);
    }

    // When we use a modifier keyword, we're are defining a new function modifier to be added to our contract
    // Modifiers are used solely as a means of reducing the amount of code
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}
