'use client';

import Image from 'next/image';
import React from 'react';
import { Button, buttonVariants } from './ui/button';
import { connectorAtom } from '@/lib/atom';
import { useAtom, useSetAtom } from 'jotai';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import formatAddress from '@/lib/formatAddress';

export default function Header() {
  const setShowConnectors = useSetAtom(connectorAtom);
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({
    address,
  });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  function handleConnect() {
    setShowConnectors(true);
  }

  return (
    <div className="absolute w-full px-8 py-4 flex bg-transparent items-center justify-between">
      <Image src="/logo.svg" width={100} height={100} alt="logo" />
      {/* <ul className="flex items-center gap-4 bg-transparent">
        <li className="cursor-pointer">Vault</li>
        <li className="text-slate-600 cursor-not-allowed">Add Liquidity</li>
        <li className="text-slate-600 cursor-not-allowed">Stake</li>
        <li className="text-slate-600 cursor-not-allowed">Arbitrage</li>
      </ul> */}
      {address ? (
        <span
          className={`${buttonVariants({
            variant: 'secondary',
          })} cursor-pointer`}>
          {ensAvatar ? (
            <Image
              width={20}
              height={20}
              alt="ENS Avatar"
              src={ensAvatar}
              className="mr-2 rounded-full"
            />
          ) : null}
          {address && <div>{ensName ? ensName : formatAddress(address)}</div>}
        </span>
      ) : (
        <Button onClick={handleConnect} className="font-bold">
          Connect
        </Button>
      )}
    </div>
  );
}
