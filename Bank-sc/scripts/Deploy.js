// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const obj = require("./temp.json");
const fs = require("fs");

async function main() {
  const GLDToken = await hre.ethers.getContractFactory("GLDToken");
  const GLDTokenInstance = await GLDToken.deploy("100000000000000000000000000000");

  await GLDTokenInstance.deployed();

  const addresses = obj.map((ele) => ele.address);
  const amount = obj.map((ele) => ele.amount);
  
  const Bank = await hre.ethers.getContractFactory("Bank");
  const BankInstance = await Bank.deploy(addresses,amount,GLDTokenInstance.address);
  fs.writeFileSync("arguments.js", `module.exports = [${addresses.map(ele=>`"${ele}"`)},[${amount.map(ele=>`"${ele}"`)}],"${GLDTokenInstance.address}"]`);
  await BankInstance.deployed();
  await GLDTokenInstance.transfer(BankInstance.address, "100000000000000000000000000000")
  console.log("Contract GLDToken deployed to:", GLDTokenInstance.address);
  console.log("Contract Bank deployed to:", BankInstance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
