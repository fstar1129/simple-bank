pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract GLDToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Baby", "BB") {
        _mint(msg.sender, initialSupply);
    }
}