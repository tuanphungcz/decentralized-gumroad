import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  Footer,
  Modal,
  ProductTab,
  DownloadTab,
  ModalContent,
  Tabs,
} from "components";
import { contractAddress, contractABI } from "utils/template";
import { AppContext } from "contexts";

const App = () => {
  const { tabKey } = useContext(AppContext);
  const [currentAccount, setCurrentAccount] = useState("");
  const [allPurchases, setAllPurchases] = useState([]);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [network, setNetwork] = useState(null);

  const [balance, setBalance] = useState(null);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const refetch = () => {
    getAllPurchases();
    getBalance();
  };
  useEffect(() => {
    if (currentAccount !== "") {
      refetch();
    }
    // eslint-disable-next-line
  }, [currentAccount]);

  useEffect(() => {
    const { ethereum }: any = window;

    if (ethereum) {
      ethereum.on("chainChanged", (network) => {
        setNetwork(parseInt(network));
      });
    }
  }, []);

  const getBalance = async () => {
    try {
      const { ethereum }: any = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const balance = await provider.getBalance(contractAddress);

        setBalance(ethers.utils.formatEther(balance));
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum }: any = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);

      let network = await provider.getNetwork();

      setNetwork(network.chainId);

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPurchases = async () => {
    try {
      const { ethereum }: any = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const cryptoGummyContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const purchases = await cryptoGummyContract.getAllPurchases();

        let purchasesCleaned = [];
        purchases.forEach((purchase) => {
          if (purchase.buyer.toLowerCase() === currentAccount.toLowerCase()) {
            setHasPurchased(true);
          }
          purchasesCleaned.push({
            address: purchase.buyer,
            timestamp: purchase.timestamp.toString(),
            message: purchase.message,
            name: purchase.name,
            value: ethers.utils.formatEther(purchase.value),
          });
        });

        setAllPurchases(purchasesCleaned.reverse());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum }: any = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal>
        <ModalContent refetch={refetch} />
      </Modal>
      <div className="w-10/12 max-w-5xl mx-auto mt-20 overflow-hidden bg-white sm:rounded-lg sm:shadow">
        <div>
          <div>
            <img className="w-full" src="/product-image-1.png" />
          </div>
          <Tabs hasPurchased={hasPurchased} />

          {tabKey === 0 ? (
            <ProductTab
              connectWallet={connectWallet}
              currentAccount={currentAccount}
              balance={balance}
              allPurchases={allPurchases}
              network={network}
            />
          ) : (
            <DownloadTab />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
