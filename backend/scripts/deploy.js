const main = async () => {
    const nftContractFactory = await hre.ethers.getContractFactory('NeonApes');
    const nftContract = await nftContractFactory.deploy("NEON APES", "NEOA", Date.now() + 3600 * 1000 * 7);
    await nftContract.deployed();
    console.log("Contract deployed to:", nftContract.address);
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