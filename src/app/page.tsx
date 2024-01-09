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
  useSwitchChain,
} from 'wagmi';
import { sepolia } from 'wagmi/chains';
import abi from '@/contract/abi.json';
import { parseEther } from 'viem';
import SwapForm from '@/components/SwapForm';

export default function Home() {
  const [isMinting, setIsMinting] = useState(true);
  const [showAlerts, setShowAlerts] = useState(false);

  const numaEst = useReadContract({
    abi: abi.abi,
    address: '0x94f007172A4128315Bcc117700fC31E79c42B0a6',
    functionName: 'getBuyNumaSimulateExtract',
    args: [parseEther('1')],
  });

  const rEthEst = useReadContract({
    abi: abi.abi,
    address: '0x94f007172A4128315Bcc117700fC31E79c42B0a6',
    functionName: 'getSellNumaSimulateExtract',
    args: [parseEther('1')],
  });

  const feeEst = useReadContract({
    abi: abi.abi,
    address: '0x94f007172A4128315Bcc117700fC31E79c42B0a6',
    functionName: 'BUY_FEE',
  });

  function closeAlerts() {
    setShowAlerts(false);
  }

  return (
    <main className="relative flex h-full flex-col items-center justify-between overflow-hidden">
      <Image
        src="/blob.png"
        width={1000}
        height={1000}
        alt="blob"
        className="absolute top-1/2 left-1/2 z-0 transform -translate-x-1/2 -translate-y-1/2 opacity-40"
      />
      <SwapForm rEthEst={rEthEst} numaEst={numaEst} feeEst={feeEst} />
      <Alerts open={showAlerts} onClose={closeAlerts} isMinting={isMinting} />
    </main>
  );
}
