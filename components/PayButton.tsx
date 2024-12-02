"use client";

import { useConnect, useAccount, useWriteContract } from "wagmi";
import { injected } from "wagmi/connectors";
import { useState } from "react";
import { sepolia } from "viem/chains";

export const PayButton = ({ price }: { price: number }) => {
  const { connectAsync } = useConnect();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [started, setStarted] = useState(false);
  const [errors, setErrors] = useState();
  const [completed, setCompleted] = useState(false);

  console.log({ address });

  const handlePayment = async () => {
    try {
      setErrors(" ");
      setStarted(true);
      if (!address) {
        await connectAsync({ chainId: sepolia.id, connector: injected() });
      }

      const data = await writeContractAsync({
        chainId: sepolia.id,
        address: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",
        functionName: "transfer",
        abi: [
          {
            inputs: [
              { internalType: "address", name: "recipient", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "transfer",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        args: ["0xb857BDDC1c59E6b9530b5d4d1ebFF52f37992758", 0],
      });
      setCompleted(true);
      console.log({ data });
    } catch (err) {
      console.log(err);
      setStarted(false);
      setErrors("Payment failed. Please try again.");
    }
  };

  return (
    <>
      {!completed && (
        <button
          disabled={started}
          className="mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handlePayment}
        >
          {started ? "Confirming..." : "Pay Now"}
        </button>
      )}
      {completed && (
        <p className="text-stone-800 mt-2 bg-green-200 rounded-md text-sm py-2 px-4">
          Thank you for your payment.
        </p>
      )}
      {errors && (
        <p className="text-stone-800 mt-2 bg-red-200 rounded-md text-sm py-2 px-4">
          {errors}
        </p>
      )}
    </>
  );
};
