import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useAtom } from 'jotai';
import { connectorAtom } from '@/lib/atom';
import { useConnect } from 'wagmi';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function ConnectorSheet() {
  const [showConnectors, setShowConnectors] = useAtom(connectorAtom);

  const { connectors, connect } = useConnect();

  function handleCloseConnectors(open: boolean) {
    if (open) return;
    setShowConnectors(false);
  }

  let filteredConnectors = connectors.filter(
    (c: any) =>
      !!c.icon ||
      (c.id !== 'safe' &&
        c.id !== 'metaMaskSDK' &&
        c.id !== 'coinbaseWalletSDK' &&
        c.name !== 'Injected')
  );

  filteredConnectors = filteredConnectors.map((c: any) => {
    if (c.id === 'walletConnect') {
      c.icon = '/walletConnect.png';
    }
    if (c.id === 'coinbaseWalletSDK') {
      c.icon = '/coinbaseWallet.svg';
    }

    return c;
  });

  return (
    <Sheet open={showConnectors} onOpenChange={handleCloseConnectors}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Connect a wallet</SheetTitle>
          {/* <SheetDescription>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
            consectetur.
          </SheetDescription> */}
        </SheetHeader>
        <div className="flex flex-col gap-1 mt-8">
          {filteredConnectors.map((connector, idx) => (
            <span
              className={cn(
                'bg-gray-500/5 p-6 cursor-pointer flex gap-4 items-center text-xl',
                idx === 0 && 'rounded-t-lg',
                idx === filteredConnectors.length - 1 && 'rounded-b-lg'
              )}
              key={connector.uid}
              onClick={() => {
                connect({ connector });
                setShowConnectors(false);
              }}>
              <Image
                src={connector.icon || '/logo.svg'}
                width={40}
                height={40}
                alt={connector.name}
              />
              <p>{connector.name}</p>
            </span>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
