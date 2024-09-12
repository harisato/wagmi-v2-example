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

export function WriteContract() {
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
      {/* <div>Mint NFT token:</div>
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
      <br /> */}
      <div>Create Launchpad:</div>
      <div>
        <button
          disabled={isPending}
          onClick={() =>
            writeContract({
              ...launchpadContractConfig,
              functionName: "createLaunchpad",
              args: [
                [
                  "0x338dc6B06fD4aA7b58447833e467FC0D42E75F20",
                  "0xCE073f676057f62Bec3dd8fa3d6700674f1211c1",
                  "Hero Cyber",
                  "1726209037",
                  "1728683451",
                  "3",
                  "1",
                ] as any,
                [
                  "0x322813fd9a801c5507c9de605d63cea4f2ce6c44",
                  "0x569e0BE633eBa92a8DeA81A39b20A9D4A138e49a", // usdt address
                  "0",
                  `https://ipfs-gw.dev.aura.network/ipfs/QmXGNP6NLrUc8wwtb3vx49zFzcK3VHyivDAkddBV4R1yT5/`,
                  `https://ipfs-gw.dev.aura.network/ipfs/QmborFqoWXtmKj6oiMMTpPHGkRA3fYEC79YAvpjKsyvUTj/`,
                  "0",
                  "0x338dc6B06fD4aA7b58447833e467FC0D42E75F20",
                ] as any,
              ],
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
    </div>
  );
}
