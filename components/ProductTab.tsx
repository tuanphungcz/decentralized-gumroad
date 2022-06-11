import { ThumbUpIcon, UserIcon } from "@heroicons/react/solid";
import { ModalContext } from "contexts";
import { useContext } from "react";
import getFirstAndLast6Chars from "utils/getFirstAndLast6Chars";
import { ProductItem } from "components";
// import { ethers } from "ethers";
import { productPage } from "utils";

// const MATIC_MAINNET = 137;
const MATIC_TESTNET = 80001;

const ProductTab = ({
  connectWallet,
  currentAccount,
  balance,
  allPurchases,
  network,
}) => {
  const { setIsModalOpen } = useContext(ModalContext);

  // const switchNetwork = async () => {
  //   try {
  //     const { ethereum }: any = window;
  //     if (ethereum.networkVersion !== MATIC_MAINNET) {
  //       await ethereum.request({
  //         method: "wallet_switchEthereumChain",
  //         params: [{ chainId: ethers.utils.hexlify(MATIC_MAINNET) }],
  //       });
  //     }
  //   } catch (err) {
  //     // This error code indicates that the chain has not been added to MetaMask.
  //     if (err.code === 4902) {
  //       const { ethereum }: any = window;

  //       await ethereum.request({
  //         method: "wallet_addEthereumChain",
  //         params: [
  //           {
  //             chainName: "Polygon Mainnet",
  //             chainId: ethers.utils.hexlify(MATIC_MAINNET),
  //             nativeCurrency: {
  //               name: "MATIC",
  //               decimals: 18,
  //               symbol: "MATIC",
  //             },
  //             rpcUrls: ["https://polygon-rpc.com/"],
  //           },
  //         ],
  //       });
  //     }
  //   }
  // };

  const buttonProps = () => {
    try {
      const { ethereum }: any = window;

      if (!ethereum) {
        console.log(network);
        return {
          onClick: () => window.open("https://metamask.io/download/", "_blank"),
          children: "Install Metamask",
        };
      }

      if (!currentAccount) {
        return {
          onClick: connectWallet,
          children: "Connect wallet",
        };
      }

      if (network !== MATIC_TESTNET) {
        return {
          onClick: () =>
            window.open(
              "https://blog.polysynth.com/how-to-connect-polygon-testnet-to-metamask-wallet-472bca410d64",
              "_blank"
            ),
          children: "Switch to MATIC testnet",
        };
      }

      return {
        onClick: () => setIsModalOpen(true),
        children: "I want this!",
      };
    } catch {}
  };

  return (
    <>
      <div className="m-4 lg:m-8 lg:flex gap-x-4">
        <div className="w-full col-span-2 ">
          <div className="relative overflow-hidden bg-white">
            <div className="relative px-4 sm:px-6 lg:px-8">
              <div className="mx-auto text-lg max-w-prose">
                <h1>
                  <span className="block text-base font-semibold tracking-wide text-indigo-600 uppercase">
                    {productPage.subtitle}
                  </span>
                  <span className="block mt-2 text-xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-3xl">
                    {productPage.title}
                  </span>
                </h1>

                <div className="flex items-center mt-4 space-x-2 text-base text-gray-500">
                  <div>{productPage.creator.text}</div>
                  <div>
                    <img
                      className="w-10 h-10 border rounded-full"
                      src={productPage.creator.image}
                    />
                  </div>
                  <a
                    href={productPage.creator.twitterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 underline"
                  >
                    {productPage.creator.username}
                  </a>
                </div>
                <div className="mt-6 prose prose-lg text-gray-500 prose-indigo">
                  {productPage.descriptions.map((description, i) => (
                    <div
                      key={i.toString()}
                      className="mb-8 text-base text-gray-500"
                    >
                      {description}
                    </div>
                  ))}
                </div>

                <img
                  className="w-full rounded-lg"
                  src="/product-image-2.png"
                  alt=""
                  width={1310}
                  height={873}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="min-w-[300px] mt-8 lg:mt-0">
          <ProductItem />

          <div>
            <button
              className="w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-blue-600"
              {...buttonProps()}
            />
          </div>

          <div className="mt-8 text-sm">
            {allPurchases?.length > 0 && (
              <>
                <div>Latest purchases (total: {balance} MATIC)</div>
                <div className="flow-root pt-4">
                  <ul role="list" className="-mb-8">
                    {allPurchases.map((purchases, eventIdx) => (
                      <li key={purchases.timestamp}>
                        <div className="relative pb-8">
                          {eventIdx !== allPurchases.length - 1 ? (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex items-center space-x-3">
                            {purchases.value === "0.00" ? (
                              <span
                                className={
                                  "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-gray-400"
                                }
                              >
                                <UserIcon
                                  className="w-5 h-5 text-white"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : (
                              <span
                                className={
                                  "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-blue-600"
                                }
                              >
                                <ThumbUpIcon
                                  className="w-5 h-5 text-white"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {purchases.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {purchases.message}
                                </div>
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href={`https://rinkeby.etherscan.io/address/${purchases.address}`}
                                  className="text-sm text-right text-gray-500 underline whitespace-nowrap"
                                >
                                  {getFirstAndLast6Chars(purchases.address)}
                                </a>
                              </div>
                              <div className="text-sm text-right text-gray-500 whitespace-nowrap">
                                <div>{purchases.value} MATIC</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTab;
