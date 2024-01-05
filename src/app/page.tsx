'use client';

import { Button } from '@/components/ui/button';
import { ArrowDownUp } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative flex h-screen flex-col items-center justify-between p-24 overflow-hidden">
      <Image
        src="/blob.png"
        width={1000}
        height={1000}
        alt="blob"
        className="absolute top-1/2 left-1/2 z-0 transform -translate-x-1/2 -translate-y-1/2 opacity-40"
      />
      <form className="max-w-lg flex flex-col z-10 bg-background p-10 rounded-2xl shadow-[0px_0px_10px_4px_#0000002f]">
        <h3 className="text-2xl font-semibold">Burn $NUMA</h3>
        <p className="mt-1 text-[#545b76]">
          Lorem ipsum dolor sit amet consectetur
        </p>
        <span className="w-full flex items-center justify-between text-sm my-5">
          <p className="text-green-500">
            Connected addr. <strong>0xfcfc...48d2</strong>
          </p>
          <a href="#" className="mt-0 font-semibold underline">
            Change Wallet?
          </a>
        </span>

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

        <Button
          type="submit"
          className="rounded-lg py-6 text-lg font-semibold mt-4">
          Burn $NUMA
        </Button>
      </form>
    </main>
  );
}
