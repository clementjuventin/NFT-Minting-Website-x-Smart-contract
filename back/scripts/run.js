const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('NeonApes');
  const nftContract = await nftContractFactory.deploy("Neon Apes", "NEOA", Date.now + 3600 * 1000 * 24);
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  console.log("Error expected because sale is not active ----------------");
  let txn0 = await nftContract.mint({
    value: ethers.utils.parseEther("0.15"),
    tokenToMint: 2
  })
  await txn0.wait()
  let txn1 = await nftContract.whitelistedMint({
    value: ethers.utils.parseEther("0.15")
  })
  await txn1.wait()
  console.log("----------------------------------------------------------");
  console.log("Add to whitelist------------------------- ----------------");
  let txn2 = await nftContract.whitelist({
    value: ethers.utils.parseEther("0.15")
  })
  await txn2.wait()
  console.log("----------------------------------------------------------");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();