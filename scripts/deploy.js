const hre = require("hardhat");

async function main() {

  const name = "BlockDrive";
  const symbol = "BD";

  const driveContract = await hre.ethers.deployContract("DriveContract", [name, symbol]);
  console.log("DriveContract deployed to",driveContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});