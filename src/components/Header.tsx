'use client';

import Image from 'next/image';
import { Button, buttonVariants } from './ui/button';
import { connectorAtom } from '@/lib/atom';
import { useSetAtom } from 'jotai';
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';
import formatAddress from '@/lib/formatAddress';

export default function Header() {
  const setShowConnectors = useSetAtom(connectorAtom);
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({
    address,
  });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  function handleConnect() {
    setShowConnectors(true);
  }

  return (
    <div className="absolute w-full px-8 py-4 flex bg-transparent items-center justify-between z-50">
      <Image src="/logo.svg" width={100} height={100} alt="logo" />
      <div className="flex items-center gap-2">
        {isConnected && address ? (
          <span
            className={`${buttonVariants({
              variant: 'secondary',
            })} cursor-pointer bg-white/5`}>
            {ensAvatar ? (
              <Image
                width={20}
                height={20}
                alt="ENS Avatar"
                src={ensAvatar}
                className="mr-2 rounded-full"
              />
            ) : null}
            <div>{ensName ? ensName : formatAddress(address)}</div>
          </span>
        ) : (
          <Button onClick={handleConnect} className="font-bold">
            Connect
          </Button>
        )}
      </div>
    </div>
  );
}
