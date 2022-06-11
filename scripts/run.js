const main = async () => {
  const purchaseContractFactory = await ethers.getContractFactory(
    "CryptoGummy"
  );

  const purchaseContract = await purchaseContractFactory.deploy();

  await purchaseContract.deployed();
  console.log("Contract address:", purchaseContract.address);

  let contractBalance = await ethers.provider.getBalance(
    purchaseContract.address
  );
  console.log(
    "Contract balance at the beginning:",
    ethers.utils.formatEther(contractBalance)
  );

  /*
   * Let's try two Purchases now
   */
  const PurchaseTxn = await purchaseContract.purchase(
    "This is Purchase #1",
    Math.round(new Date().getTime() / 1000),
    "User 1",

    {
      value: ethers.utils.parseEther("0.01"),
    }
  );
  await PurchaseTxn.wait();

  const PurchaseTxn2 = await purchaseContract.purchase(
    "This is Purchase #2",
    Math.round(new Date().getTime() / 1000),
    "User 2",
    {
      value: ethers.utils.parseEther("0.02"),
    }
  );
  await PurchaseTxn2.wait();

  const PurchaseTxn3 = await purchaseContract.purchase(
    "This is Purchase #3",
    Math.round(new Date().getTime() / 1000),
    "User 3",

    {
      value: ethers.utils.parseEther("0.03"),
    }
  );
  await PurchaseTxn3.wait();

  contractBalance = await ethers.provider.getBalance(purchaseContract.address);
  console.log(
    "Contract balance after 3 purchases",
    ethers.utils.formatEther(contractBalance)
  );

  let allPurchases = await purchaseContract.getAllPurchases();
  console.log(allPurchases);

  const withdrawAllTxn = await purchaseContract.withdraw(
    ethers.utils.parseEther("0.02")
  );
  await withdrawAllTxn.wait();

  let contractBalance2 = await ethers.provider.getBalance(
    purchaseContract.address
  );

  console.log(
    "Contract balance after withdrawal of 0.02 eth:",
    ethers.utils.formatEther(contractBalance2)
  );
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
