import { connectorAtom, numaInputAtom, rEthInputAtom } from '@/lib/atom';
import formatAddress from '@/lib/formatAddress';
import { cn } from '@/lib/utils';
import { useAtom, useSetAtom } from 'jotai';
import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { formatEther } from 'viem';
import {
  useAccount,
  useConnections,
  useDisconnect,
  useSwitchChain,
} from 'wagmi';
import { Button } from './ui/button';
import { ArrowDownUp } from 'lucide-react';
import { sepolia } from 'viem/chains';

export default function SwapForm({
  rEthEst,
  numaEst,
  fee,
  setShowAlerts,
  price,
}: any) {
  const [numa, setNuma] = useAtom(numaInputAtom);
  const [rEth, setEth] = useAtom(rEthInputAtom);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isMinting, setIsMinting] = useState(true);
  const setShowConnectors = useSetAtom(connectorAtom);
  const { switchChain } = useSwitchChain();
  const connections = useConnections();

  function handleNumaChange(e: ChangeEvent<HTMLInputElement>) {
    setNuma(e.target.value);

    if (typeof rEthEst?.data === 'bigint') {
      setEth(
        (Number(formatEther(rEthEst.data)) * Number(e.target.value)).toString()
      );
    }
  }

  function handleEthChange(e: ChangeEvent<HTMLInputElement>) {
    setEth(e.target.value);

    if (typeof numaEst?.data === 'bigint') {
      setNuma(
        (Number(formatEther(numaEst.data)) * Number(e.target.value)).toString()
      );
    }
  }

  function switchNetwork() {
    switchChain({ chainId: sepolia.id });
  }

  function handleFlip() {
    setIsMinting(!isMinting);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowAlerts(true);
  }

  let onSepolia = true;
  if (isConnected && connections[0].chainId !== sepolia.id) {
    onSepolia = false;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-32 max-w-lg flex flex-col z-10 bg-background p-10 rounded-2xl shadow-[0px_0px_10px_4px_#0000002f]">
      <h3 className="text-2xl font-semibold">
        {isMinting ? 'Mint' : 'Burn'} $NUMA
      </h3>
      <p className="mt-1 text-[#545b76] mb-5">
        {isMinting
          ? 'Deposit $rETH into the vault to mint $NUMA'
          : 'Burn $NUMA to remove $rETH from the vault'}
      </p>
      {address ? (
        <span className="w-full flex items-center justify-between text-sm mb-5">
          <p>
            Connected addr. <strong>{formatAddress(address)}</strong>
          </p>
          <p
            className="mt-0 font-semibold cursor-pointer hover:underline"
            onClick={() => disconnect()}>
            Disconnect?
          </p>
        </span>
      ) : null}

      <div className="flex flex-col">
        <div
          className={cn(
            'order-1 w-full flex flex-col gap-2 rounded-2xl bg-[#16181fd2] p-4 mb-2',
            !isMinting && 'order-3'
          )}>
          <span className="w-full flex items-center justify-between text-sm text-gray-600">
            {isMinting ? <p>You pay</p> : <p>You receive</p>}
            <p className="whitespace-nowrap">Balance: 1.249</p>
          </span>
          <span className="w-full flex items-center justify-between text-sm">
            <input
              type="number"
              placeholder="0"
              value={rEth}
              onChange={handleEthChange}
              className="w-full text-4xl border-0 outline-0 bg-transparent number-input"
            />
            <span className="flex min-w-max items-center text-sm rounded-2xl px-2 py-1 gap-2 bg-[#0d0e12]">
              <Image
                src="/rEthIcon.png"
                width={20}
                height={20}
                alt="rEth"
                className="rounded-full"
              />
              <p>rETH</p>
            </span>
          </span>
        </div>

        <span
          onClick={handleFlip}
          className="order-2 w-max h-max p-2 rounded-full bg-background text-[#3d4154] flex item-center justify-center mx-auto -my-5 z-10 cursor-pointer hover:bg-[#1b1e25] hover:text-[#8a90a5]">
          <ArrowDownUp />
        </span>

        <div
          className={cn(
            'order-3 w-full flex flex-col gap-2 rounded-2xl bg-[#16181fd2] p-4 mb-2',
            !isMinting && 'order-1'
          )}>
          <span className="w-full flex items-center justify-between text-sm text-gray-600">
            {!isMinting ? <p>You pay</p> : <p>You receive</p>}
            <p className="whitespace-nowrap">Balance: 0</p>
          </span>
          <span className="w-full flex items-center justify-between text-sm">
            <input
              type="number"
              placeholder="0"
              value={numa || ''}
              onChange={handleNumaChange}
              className="w-full text-4xl border-0 outline-0 bg-transparent number-input"
            />
            <span className="flex min-w-max items-center text-sm rounded-2xl px-2 py-1 gap-2 bg-[#0d0e12]">
              <Image
                src="/numaIcon.png"
                width={20}
                height={20}
                alt="numa"
                className="rounded-full"
              />
              <p>NUMA</p>
            </span>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-1 text-[#979fc1]">
        {price ? <p>1 rEth = {price} NUMA</p> : <p></p>}
        <p>Fee: {fee}%</p>
      </div>
      {onSepolia ? (
        address ? (
          <Button
            disabled={numa === '0' || rEth === '0'}
            type="submit"
            className="rounded-lg py-6 text-lg font-semibold mt-4">
            {isMinting ? 'Mint' : 'Burn'} $NUMA
          </Button>
        ) : (
          <Button
            type="button"
            className="rounded-lg py-6 text-lg font-semibold mt-4"
            onClick={() => setShowConnectors(true)}>
            Connect
          </Button>
        )
      ) : (
        <Button
          type="button"
          variant="destructive"
          onClick={switchNetwork}
          className="rounded-lg py-6 text-lg font-semibold mt-4">
          Switch to Sepolia
        </Button>
      )}
    </form>
  );
}
