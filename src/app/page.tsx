'use client';

import Alerts from '@/components/Alerts';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAccount, useReadContracts } from 'wagmi';
import abi from '@/contract/abi.json';
import { erc20Abi, formatEther, parseEther } from 'viem';
import SwapForm from '@/components/SwapForm';
import { ETH_ADDRESS, NUMA_ADDRESS, VAULT_ADDRESS } from '@/contract/contract';
import useEthPrice from '@/hooks/useEthPrice';
import getNumaUsd from '@/lib/getNumaUsd';
import getREthMax from '@/lib/getREthMax';

const address = VAULT_ADDRESS;

export default function Home() {
  const [isMinting, setIsMinting] = useState(true);
  const [showAlerts, setShowAlerts] = useState(false);
  const { address: owner } = useAccount();

  const ethPrice = useEthPrice();

  const result = useReadContracts({
    contracts: [
      {
        abi,
        address,
        functionName: 'getBuyNumaSimulateExtract',
        args: [parseEther('1')],
      },
      {
        abi,
        address,
        functionName: 'getSellNumaSimulateExtract',
        args: [parseEther('1')],
      },
      {
        abi,
        address,
        functionName: 'BUY_FEE',
      },
      {
        abi,
        address,
        functionName: 'MAX_PERCENT',
      },
      {
        abi: erc20Abi,
        address: ETH_ADDRESS,
        functionName: 'balanceOf',
        args: [VAULT_ADDRESS ? VAULT_ADDRESS : '0x0000000'],
      },
      {
        abi: erc20Abi,
        address: ETH_ADDRESS,
        functionName: 'balanceOf',
        args: [owner ? owner : '0x0000000'],
      },
      {
        abi: erc20Abi,
        address: NUMA_ADDRESS,
        functionName: 'balanceOf',
        args: [owner ? owner : '0x0000000'],
      },
      {
        abi: erc20Abi,
        address: ETH_ADDRESS,
        functionName: 'allowance',
        args: [owner ? owner : '0x0000000', VAULT_ADDRESS],
      },
      {
        abi: erc20Abi,
        address: NUMA_ADDRESS,
        functionName: 'allowance',
        args: [owner ? owner : '0x0000000', VAULT_ADDRESS],
      },
    ],
  });

  useEffect(() => {
    let interval = setInterval(() => {
      result.refetch();
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [
    numaEst,
    rEthEst,
    feeEst,
    maxPercent,// ttc
    vaultBalance,// ttc
    ethBalance,
    numaBalance,
    ethAllowance,
    numaAllowance,
  ] = result.data || Array(9).fill(null);

  function closeAlerts() {
    setShowAlerts(false);
  }

  let fee: number | null = null;

  if (feeEst?.result) {
    fee = 100 - (Number(feeEst?.result) / 1000) * 100;
  }

  const token = {
    ethBalance: ethBalance?.result ? formatEther(ethBalance?.result) : null,
    numaBalance: numaBalance?.result ? formatEther(numaBalance?.result) : null,
    ethAllowance: ethAllowance?.result
      ? formatEther(ethAllowance?.result)
      : null,
    numaAllowance: numaAllowance?.result
      ? formatEther(numaAllowance?.result)
      : null,
  };

  const numaPrice = getNumaUsd(ethPrice, numaEst?.result);

  const rEthMaxLimit = getREthMax(maxPercent?.result,vaultBalance?.result)//maxPercent * vaultBalance * 0.001;

  return (
    <main className="relative flex h-full flex-col items-center justify-between overflow-hidden">
      <Image
        src="/blob.png"
        width={1000}
        height={1000}
        alt="blob"
        className="absolute top-1/2 left-1/2 z-0 transform -translate-x-1/2 -translate-y-1/2 opacity-40"
      />
      <SwapForm
        rEthEst={rEthEst}
        numaEst={numaEst}
        fee={fee}
        numaPrice={numaPrice}
        token={token}
        isMinting={isMinting}
        rEthMaxLimit = {rEthMaxLimit}

        setIsMinting={setIsMinting}
        setShowAlerts={setShowAlerts}
        refetch={result?.refetch}
      />
      <Alerts
        open={showAlerts}
        onClose={closeAlerts}
        isMinting={isMinting}
        token={token}
        fee={fee}
        numaPrice={numaPrice}
        refetch={result?.refetch}
      />
    </main>
  );
}
