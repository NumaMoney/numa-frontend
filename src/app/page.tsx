'use client';

import Alerts from '@/components/Alerts';
import { connectorAtom } from '@/lib/atom';
import { useSetAtom } from 'jotai';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import {
  useAccount,
  useConnections,
  useDisconnect,
  useReadContract,
  useReadContracts,
  useSwitchChain,
} from 'wagmi';
import { sepolia } from 'wagmi/chains';
import abi from '@/contract/abi.json';
import { erc20Abi, formatEther, parseEther } from 'viem';
import SwapForm from '@/components/SwapForm';
import { ETH_ADDRESS, NUMA_ADDRESS, VAULT_ADDRESS } from '@/contract/contract';

const address = VAULT_ADDRESS;

export default function Home() {
  const [isMinting, setIsMinting] = useState(true);
  const [showAlerts, setShowAlerts] = useState(false);
  const { address: owner } = useAccount();

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
    ],
  });

  const [numaEst, rEthEst, feeEst, ethBalance, numaBalance] = result.data || [
    null,
    null,
    null,
    null,
    null,
  ];

  function closeAlerts() {
    setShowAlerts(false);
  }

  let price: number | null = null;
  let fee: number | null = null;

  if (typeof numaEst?.result === 'bigint') {
    price = Number(formatEther(numaEst.result));
  }

  if (feeEst?.result) {
    fee = 100 - (Number(feeEst?.result) / 1000) * 100;
  }

  const balances = {
    ethBalance: ethBalance?.result ? formatEther(ethBalance?.result) : null,
    numaBalance: numaBalance?.result ? formatEther(numaBalance?.result) : null,
  };
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
        price={price}
        balances={balances}
        isMinting={isMinting}
        setIsMinting={setIsMinting}
        setShowAlerts={setShowAlerts}
      />
      <Alerts
        open={showAlerts}
        onClose={closeAlerts}
        isMinting={isMinting}
        balances={balances}
        fee={fee}
        price={price}
      />
    </main>
  );
}
