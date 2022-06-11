const main = async () => {
  const PurchaseContractFactory = await hre.ethers.getContractFactory(
    "CryptoGummy"
  );
  const PurchaseContract = await PurchaseContractFactory.deploy();

  await PurchaseContract.deployed();

  console.log("cryptoGummy address: ", PurchaseContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
