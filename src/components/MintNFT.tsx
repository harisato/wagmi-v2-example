import { useState } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";

import {
  wagmiContractConfig,
  mintNftContractConfig,
  launchpadContractConfig,
} from "./contracts";
import { Address, stringify } from "viem";

export function MintNFT() {
  const [tokenId, setTokenId] = useState<string>("");
  const { chain, address } = useAccount();

  const { data, error, isPending, isError, writeContract } = useWriteContract();
  const {
    data: receipt,
    isLoading,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash: data });

  return (
    <div>
      <div>
        <button
          disabled={isPending}
          onClick={() =>
            writeContract({
              ...mintNftContractConfig,
              functionName: "mint",
              args: [address as Address],
            })
          }
        >
          Mint
        </button>
      </div>
      {isPending && <div>Pending...</div>}
      {isSuccess && (
        <>
          <a
            target="__blank"
            href={`${chain?.blockExplorers?.default?.url}/tx/${data}`}
          >
            Transaction Hash: {data}
          </a>
          <div>NFT Contract Address: {mintNftContractConfig.address} </div>
          <div> NFT Token ID: {parseInt(receipt.logs[0].topics[3], 16)}</div>
        </>
      )}
      {isError && <div>{error?.message}</div>}
      <br />
      {isPending && <div>Pending...</div>}
    </div>
  );
}
