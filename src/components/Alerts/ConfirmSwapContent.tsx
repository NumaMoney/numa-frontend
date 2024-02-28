import {
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { MoveRight, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useAtomValue } from 'jotai';
import { numaInputAtom, rEthInputAtom } from '@/lib/atom';

export default function ConfirmSwapContent({
  isMinting,
  handleSwap,
  numaPrice,
  fee,
}: any) {
  const rEth = useAtomValue(rEthInputAtom);
  const numa = useAtomValue(numaInputAtom);

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-center justify-between">
          <p>Review {isMinting ? 'Mint' : 'Burn'}</p>
          <AlertDialogCancel className="p-1/2 border-0 h-max ml-auto rounded-full ">
            <X size={18} />
          </AlertDialogCancel>
        </AlertDialogTitle>
      </AlertDialogHeader>
      <div className="flex flex-col gap-8 mt-4">
        <div className="flex items-center justify-between gap-6">
          <div
            className={cn(
              'flex flex-col text-sm order-1',
              !isMinting && 'order-3'
            )}>
            <p className={cn('text-gray-400 mb-4', !isMinting && 'ml-auto')}>
              {isMinting ? 'You are spending' : 'You will receive'}
            </p>
            <span
              className={cn(
                'w-max flex gap-2 items-center',
                !isMinting && 'ml-auto flex-row-reverse'
              )}>
              <Image
                src="/rEthIcon.png"
                width={30}
                height={30}
                alt="rEth"
                className="rounded-full"
              />
              <p className="text-lg">rETH</p>
            </span>
            <h3 className={cn('text-3xl mt-2', !isMinting && 'ml-auto')}>
              {Number(rEth).toFixed(2)}
            </h3>
          </div>
          <MoveRight size={40} className="order-2" />
          <div
            className={cn(
              'flex flex-col text-sm order-3',
              !isMinting && 'order-1'
            )}>
            <p className="text-gray-400 mb-4 ml-auto">
              {!isMinting ? 'You are spending' : 'You will receive'}
            </p>
            <span
              className={cn(
                'w-max flex gap-2 items-center ml-auto',
                !isMinting && 'ml-0 flex-row-reverse'
              )}>
              <p className="text-lg">NUMA</p>
              <Image
                src="/numaIcon.png"
                width={30}
                height={30}
                alt="numa"
                className="rounded-full"
              />
            </span>
            <h3 className={cn('text-3xl mt-2 ml-auto', !isMinting && 'ml-0')}>
              {Number(numa).toFixed(2)}
            </h3>
          </div>
        </div>
        <div className="flex flex-col gap-1 bg-black p-4 rounded-lg">
          <div className="flex items-center justify-between py-1 text-sm text-gray-400">
            <p>Price</p>
            {numaPrice ? <p>${numaPrice.toFixed(2)}</p> : <p>-</p>}
          </div>
          <div className="flex items-center justify-between py-1 text-sm text-gray-400">
            <p>Fee</p>
            {fee ? <p>{fee}%</p> : <p>-</p>}
          </div>
          <div className="flex items-center justify-between py-1 text-sm text-gray-400">
            <p>Network cost</p>
            <span className="flex gap-1">
              {/* <p>{'<0.05'} Sepolia</p> */}
              <p>{'<0.05'} Arbitrum</p>
              <Image
                src="/rEthIcon.png"
                width={20}
                height={20}
                alt="rEth"
                className="rounded-full"
              />
            </span>
          </div>
        </div>
      </div>
      <AlertDialogFooter className="mt-4">
        <Button
          className="w-full font-semibold text-lg py-6"
          onClick={handleSwap}>
          Confirm {isMinting ? 'Mint' : 'Burn'}
        </Button>
      </AlertDialogFooter>
    </>
  );
}
