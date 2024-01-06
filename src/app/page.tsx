'use client';

import { Button } from '@/components/ui/button';
import { connectorAtom } from '@/lib/atom';
import formatAddress from '@/lib/formatAddress';
import { useSetAtom } from 'jotai';
import { ArrowDownUp } from 'lucide-react';
import Image from 'next/image';
import { useAccount, useDisconnect } from 'wagmi';

export default function Home() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const setShowConnectors = useSetAtom(connectorAtom);

  return (
    <main className="relative flex  flex-col items-center justify-between p-24 overflow-hidden">
      <Image
        src="/blob.png"
        width={1000}
        height={1000}
        alt="blob"
        className="absolute top-1/2 left-1/2 z-0 transform -translate-x-1/2 -translate-y-1/2 opacity-40"
      />
      <form className="max-w-lg flex flex-col z-10 bg-background p-10 rounded-2xl shadow-[0px_0px_10px_4px_#0000002f]">
        <h3 className="text-2xl font-semibold">Burn $NUMA</h3>
        <p className="mt-1 text-[#545b76] mb-5">
          Lorem ipsum dolor sit amet consectetur
        </p>
        {address ? (
          <span className="w-full flex items-center justify-between text-sm mb-5">
            <p>
              Connected addr. <strong>{formatAddress(address)}</strong>
            </p>
            {/* <p
              className="mt-0 font-semibold cursor-pointer hover:underline"
              onClick={() => disconnect()}>
              Disconnect?
            </p> */}
          </span>
        ) : null}

        <div className="w-full flex flex-col gap-2 rounded-2xl bg-[#16181fd2] p-4 mb-2">
          <span className="w-full flex items-center justify-between text-sm text-gray-600">
            <p>You pay</p>
            <p className="whitespace-nowrap">Balance: 1.249</p>
          </span>
          <span className="w-full flex items-center justify-between text-sm">
            <input
              type="number"
              placeholder="0"
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

        <span className="w-max h-max p-2 rounded-full bg-background text-[#3d4154] flex item-center justify-center mx-auto -my-5 z-10 cursor-pointer hover:bg-[#1b1e25] hover:text-[#8a90a5]">
          <ArrowDownUp />
        </span>

        <div className="w-full flex flex-col gap-2 rounded-2xl bg-[#16181fd2] p-4 mb-2">
          <span className="w-full flex items-center justify-between text-sm text-gray-600">
            <p>You receive</p>
            <p className="whitespace-nowrap">Balance: 0</p>
          </span>
          <span className="w-full flex items-center justify-between text-sm">
            <input
              type="number"
              placeholder="0"
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

        <div className="flex items-center justify-between mt-1 text-[#979fc1]">
          <p>Price: $0.45</p>
          <p>Fee: 5%</p>
        </div>
        {address ? (
          <Button
            type="submit"
            className="rounded-lg py-6 text-lg font-semibold mt-4">
            Burn $NUMA
          </Button>
        ) : (
          <Button
            type="button"
            className="rounded-lg py-6 text-lg font-semibold mt-4"
            onClick={() => setShowConnectors(true)}>
            Connect
          </Button>
        )}
      </form>
    </main>
  );
}
