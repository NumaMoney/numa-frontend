import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';

export default function Header() {
  return (
    <div className="w-full px-8 py-4 flex  bg-transparent items-center justify-between">
      <Image src="/logo.svg" width={100} height={100} alt="logo" />
      <ul className="flex items-center gap-4 bg-transparent">
        <li className="cursor-pointer">Vault</li>
        <li className="text-slate-600 cursor-not-allowed">Add Liquidity</li>
        <li className="text-slate-600 cursor-not-allowed">Stake</li>
        <li className="text-slate-600 cursor-not-allowed">Arbitrage</li>
      </ul>
      <Button className="font-bold">Connected</Button>
    </div>
  );
}
