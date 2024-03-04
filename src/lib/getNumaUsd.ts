import { formatEther } from 'viem';

export default function getNumaUsd(
  ethPrice: string | null,
  isMinting:boolean,
  numa: bigint | null,
  rEth: bigint | null
) {
  if (!numa || !rEth || !ethPrice) return 0;
  let result = 0;
  if (isMinting)
    result = Number(ethPrice) / Number(formatEther(numa));
  else
    result = Number(ethPrice) * Number(formatEther(rEth));

  return result;
 
}
