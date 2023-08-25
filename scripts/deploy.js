const hre = require("hardhat");

async function main() {

  const driveContract = await hre.ethers.deployContract("DriveContract");
  console.log("DriveContract deployed to",driveContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});