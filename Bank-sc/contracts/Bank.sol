pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract Bank {
    mapping(address=> uint256) public accounts;
    IERC20 token;
    constructor(address[] memory _address, uint[] memory _amount, IERC20 _token) {
       require(_address.length == _amount.length, "Invalid Arguments");
       require(address(0) != address(_token));
       token = _token;
       for(uint i = 0; i < _address.length; i++){
            accounts[_address[i]] =  _amount[i];
       }
    }
    function claim(uint256 amount) public {
        require(accounts[msg.sender] != 0, "You're not allowed");
        require(accounts[msg.sender] >= amount, "You're not allowed");
        accounts[msg.sender] -= amount;
        token.transfer(msg.sender, amount);
    }
}