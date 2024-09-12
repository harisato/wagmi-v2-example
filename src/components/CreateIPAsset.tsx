import { useState } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";

import { useIpAsset } from "@story-protocol/react-sdk";

import {
  wagmiContractConfig,
  mintNftContractConfig,
  launchpadContractConfig,
} from "./contracts";
import { Address, stringify } from "viem";

export function CreateIPAsset() {
  const [nftContract, setNftContract] = useState<string>("");
  const [tokenId, setNftTokenId] = useState<string>("");
  const { chain, address } = useAccount();

  const { data, error, isPending, isError, writeContract } = useWriteContract();
  const {
    data: receipt,
    isLoading,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash: data });

  return (
    <div>
      <input
        onChange={(e) => setNftContract(e.target.value)}
        placeholder="token id"
        value={nftContract}
      />
      <input
        onChange={(e) => setNftTokenId(e.target.value)}
        placeholder="token id"
        value={tokenId}
      />
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
