import { formatEther } from 'viem';

export default function getNumaUsd(
  ethPrice: string | null,
  numa: bigint | null
) {
  if (!numa || !ethPrice) return 0;
  return Number(ethPrice) / Number(formatEther(numa));
}
