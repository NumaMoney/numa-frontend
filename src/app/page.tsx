'use client';

import { Button } from '@/components/ui/button';
import { ArrowDownUp } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="max-w-md flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold">Burn $NUMA</h3>
        <p className="mt-1 text-[#545b76]">
          Lorem ipsum dolor sit amet consectetur
        </p>
        <span className="w-full flex items-center justify-between text-sm my-5">
          <p>
            Burning from <strong>0xfcfc...48d2</strong>
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
            <span className="flex items-center text-sm rounded-2xl px-3 py-1 gap-1 bg-[#0d0e12]">
              <p>NUMA</p>
            </span>
          </span>
        </div>
        <span className="w-max h-max p-2 rounded-full bg-[#0d0e12] text-[#3d4154] flex item-center justify-center mx-auto -my-5 z-10 cursor-pointer hover:bg-[#3b4255] hover:text-[#8a90a5]">
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
            <span className="flex items-center text-sm rounded-2xl px-3 py-1 gap-1 bg-[#0d0e12]">
              <p>rETH</p>
            </span>
          </span>
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
