import ProductCard from "@/components/ProductCard";
import ConnectAccount from "@/containers/connect";
import SepoilTransactionComponent from "@/containers/sepoilTransaction";
import TransferEther from "@/containers/walletTransaction";

export default function Home() {
  return (
    <>
      <ConnectAccount />
      <SepoilTransactionComponent
        product={{
          image: "/next.svg",
          name: "Next.js",
          price: 1,
        }}
      />
      <TransferEther />
    </>
  );
}
