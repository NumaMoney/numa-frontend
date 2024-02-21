import { formatEther } from 'viem';

export default function getREthMax(
  percent: number | null,
  vaultBalance: bigint | null
) {
  if (!percent || !vaultBalance) return 0;
  return percent * Number(formatEther(vaultBalance))*0.001;
}
