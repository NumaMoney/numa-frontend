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
import { toast } from 'sonner';
import useMediaQuery from '@/hooks/useMediaQuery';

export default function ConnectorSheet() {
  const [showConnectors, setShowConnectors] = useAtom(connectorAtom);
  const isMobile = useMediaQuery('(max-width: 740px)');

  const { connectors, connect } = useConnect();

  function handleCloseConnectors(open: boolean) {
    if (open) return;
    setShowConnectors(false);
  }

  let filteredConnectors = connectors.filter(
    (c: any) => c.type !== 'injected' && c.id !== 'safe'
  );

  filteredConnectors = filteredConnectors.map((c: any) => {
    if (c.id === 'walletConnect') {
      c.icon = '/walletConnect.png';
    }
    if (c.id === 'coinbaseWalletSDK') {
      c.icon = '/coinbaseWallet.svg';
    }
    if (c.id === 'metaMaskSDK') {
      c.icon = '/metamask.svg';
    }

    return c;
  });

  filteredConnectors = isMobile
    ? filteredConnectors.filter(
        (c: any) => !(c.id === 'coinbaseWalletSDK' || c.id == 'metaMaskSDK')
      )
    : filteredConnectors;

  console.log('filteredConnectors', filteredConnectors);

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
                'bg-gray-500/5 px-3 py-5 md:px-6 cursor-pointer flex gap-4 items-center',
                idx === 0 && 'rounded-t-lg',
                idx === filteredConnectors.length - 1 && 'rounded-b-lg'
              )}
              key={connector.uid}
              onClick={() => {
                toast(JSON.stringify(connector));
                // connect({ connector });
              }}>
              <Image
                src={connector.icon || '/logo.svg'}
                width={40}
                height={40}
                alt={connector.name}
                className="w-6 h-6 md:w-10 md:h-10"
              />
              <p className="text-lg md:text-xl">{connector.name}</p>
            </span>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
