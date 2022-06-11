import { ethers } from "ethers";
import { getFirstAndLast6Chars } from "utils";
import { InputField, Loader, ProductItem } from "components";
import toast from "react-hot-toast";
import { contractAddress, contractABI } from "utils/template";
import { useForm } from "react-hook-form";
import { ModalContext, AppContext } from "contexts";
import { useContext } from "react";

const ModalContent = ({ refetch }) => {
  const { setIsModalOpen } = useContext(ModalContext);
  const { lastTx, setLastTx, setTabKey } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (props) => {
    const { amount, name, message } = props;
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

        setLastTx({ state: "waitingForExtension", txhash: "" });

        const purchaseTxn = await cryptoGummyContract.purchase(
          message,
          Math.round(new Date().getTime() / 1000),
          name,
          {
            gasLimit: 300000,
            value: ethers.utils.parseEther(amount || "0.00"),
          }
        );

        setLastTx({ state: "pending", txhash: purchaseTxn.hash });
        await purchaseTxn.wait();

        setLastTx({ state: "completed", txhash: purchaseTxn.hash });
        toast.success("You can now enjoy your purchase in the Download tab");
        setTabKey(1);
        refetch();
        reset();
        setIsModalOpen(false);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      setLastTx({ state: null, txhash: null });
      console.log(error);
    }
  };

  if (lastTx.state === "pending") {
    return (
      <div className="flex flex-col items-center mx-16 my-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Processing
        </h2>

        <p className="text-lg leading-6 text-gray-500 ">
          The payment is being processed ...
        </p>

        <Loader
          className="w-32 h-32 my-16 -ml-1 text-white animate-spin"
          fill="#2563EB"
        />

        <a
          target="_blank"
          rel="noreferrer"
          href={`https://rinkeby.etherscan.io/tx/${lastTx.txhash}`}
        >
          <div className="underline pointer">
            {getFirstAndLast6Chars(lastTx.txhash)}
          </div>
        </a>
      </div>
    );
  }

  if (lastTx.state === "completed") {
    return (
      <div className="flex flex-col items-center mx-8 my-8">
        <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Completed!
        </h2>

        <p className="mb-8 text-lg leading-6 text-gray-500 ">
          Thank you for your support!
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-48 h-48 mb-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#2563EB"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <a
          target="_blank"
          rel="noreferrer"
          href={`https://rinkeby.etherscan.io/tx/${lastTx.txhash}`}
        >
          <div className="mb-16 underline pointer">
            {getFirstAndLast6Chars(lastTx.txhash)}
          </div>
        </a>

        <div
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(false);
            setLastTx({ state: null, txhash: null });
          }}
          className="block w-full px-6 py-3 text-base font-medium text-center text-white bg-blue-600 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-blue-700 focus:bg-blue-600 "
        >
          Done
        </div>
      </div>
    );
  }

  return (
    <form
      className="grid grid-cols-1 gap-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Complete checkout
      </h2>
      <p className="text-lg leading-6 text-gray-500 ">
        Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa
        dictumst amet. Sapien tortor lacus arcu.
      </p>

      <ProductItem />

      <InputField title="Name">
        <input
          placeholder="John"
          className="block w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
          {...register("name", { required: true })}
        />
        {errors?.name && <div className="text-sm text-red-400">Required</div>}
      </InputField>

      <InputField title="Message">
        <input
          placeholder="Thanks for you work!"
          className="block w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
          {...register("message", { required: true })}
        />
        {errors?.message && (
          <div className="text-sm text-red-400">Required</div>
        )}
      </InputField>

      <InputField title="Donate some MATIC">
        <input
          placeholder="1"
          // type="number"
          className="block w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
          {...register("amount")}
        />
        {errors?.amount && <div className="text-sm text-red-400">Required</div>}
      </InputField>

      <button
        className="items-center justify-center block w-full px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
        type="submit"
      >
        {lastTx.state === "waitingForExtension" ? (
          <div className="flex justify-center">
            <Loader
              className="w-6 h-6 mr-2 text-white animate-spin"
              fill="#fff"
            />
            Processing...
          </div>
        ) : (
          "Checkout"
        )}
      </button>
    </form>
  );
};

export default ModalContent;
