const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Contract", async function () {
  it("Should make a purchase", async function () {
    const PurchaseContract = await ethers.getContractFactory("CryptoGummy");
    const contract = await PurchaseContract.deploy();
    await contract.deployed();

    const PurchaseTxn = await contract.purchase(
      "This is Purchase #1",
      Math.round(new Date().getTime() / 1000),
      "User 1",
      {
        value: ethers.utils.parseEther("0.01"),
      }
    );
    await PurchaseTxn.wait();

    let allPurchases = await contract.getAllPurchases();
    const contractBalance = await ethers.provider.getBalance(contract.address);

    expect(allPurchases[0].message).to.equal("This is Purchase #1");
    expect(ethers.utils.formatEther(contractBalance)).to.equal("0.01");
  });

  it("Should make multiple purchases", async function () {
    const PurchaseContract = await ethers.getContractFactory("CryptoGummy");
    const contract = await PurchaseContract.deploy();
    await contract.deployed();

    const PurchaseTxn1 = await contract.purchase(
      "This is Purchase #1",
      Math.round(new Date().getTime() / 1000),
      "User 1",
      {
        value: ethers.utils.parseEther("1.0"),
      }
    );
    await PurchaseTxn1.wait();

    const PurchaseTxn2 = await contract.purchase(
      "This is Purchase #2",
      Math.round(new Date().getTime() / 1000),
      "User 2",
      {
        value: ethers.utils.parseEther("2.0"),
      }
    );
    await PurchaseTxn2.wait();

    const PurchaseTxn3 = await contract.purchase(
      "This is Purchase #3",
      Math.round(new Date().getTime() / 1000),
      "User 3",
      {
        value: ethers.utils.parseEther("3.0"),
      }
    );
    await PurchaseTxn3.wait();

    let allPurchases = await contract.getAllPurchases();
    const contractBalance = await ethers.provider.getBalance(contract.address);

    expect(allPurchases.length).to.equal(3);
    expect(ethers.utils.formatEther(contractBalance)).to.equal("6.0");
  });

  it("Should be able to withdraw all", async function () {
    const [owner] = await ethers.getSigners();

    const ownerBalance = await ethers.provider.getBalance(owner.address);

    const PurchaseContract = await ethers.getContractFactory("CryptoGummy");
    const contract = await PurchaseContract.deploy();
    await contract.deployed();

    const PurchaseTxn = await contract.purchase(
      "This is Purchase #1",
      Math.round(new Date().getTime() / 1000),
      "User 1",
      {
        value: ethers.utils.parseEther("10.0"),
      }
    );
    await PurchaseTxn.wait();

    expect(
      ethers.utils.formatEther(
        await ethers.provider.getBalance(contract.address)
      )
    ).to.equal("10.0");

    const withdrawAllTxn = await contract.withdrawAll();
    await withdrawAllTxn.wait();

    expect(
      ethers.utils.formatEther(
        await ethers.provider.getBalance(contract.address)
      )
    ).to.equal("0.0");
  });
});
