import { type Chain } from "viem";

export const iliad = {
  id: 1513,
  name: "Story Iliad Testnet",
  nativeCurrency: { name: "IP", symbol: "IP", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet.storyrpc.io"] },
  },
  blockExplorers: {
    default: { name: "Aurascan", url: "https://story.aurascan.io/" },
  },
  testnet: true,
} as const satisfies Chain;
