import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { MoveRight, X } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

type AlertProps = {
  open: boolean;
  onClose: () => void;
  isMinting: boolean;
};

export default function Alerts({ open, onClose, isMinting }: AlertProps) {
  async function handleSwap() {
    const promise = () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ name: 'Sonner' }), 2000)
      );

    toast.promise(promise, {
      loading: 'Confirm Swap from wallet',
      success: (data) => {
        return `Permission Granted`;
      },
      error: 'Error',
    });
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <p>Review {isMinting ? 'Mint' : 'Burn'}</p>
            <AlertDialogCancel className="p-1/2 border-0 h-max ml-auto rounded-full bg-foreground text-background hover:bg-foreground/80 hover:text-background/80">
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
                {Number(2).toFixed(2)}
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
                {Number(4).toFixed(2)}
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-1 bg-black p-4 rounded-lg">
            <div className="flex items-center justify-between py-1 text-sm text-gray-400">
              <p>Rate</p>
              <p>1 rETH = 2 NUMA</p>
            </div>
            <div className="flex items-center justify-between py-1 text-sm text-gray-400">
              <p>Fee</p>
              <p>$0</p>
            </div>
            <div className="flex items-center justify-between py-1 text-sm text-gray-400">
              <p>Network cost</p>
              <p>{'<$0.01'}</p>
            </div>
          </div>
        </div>
        <AlertDialogFooter className="mt-4">
          <AlertDialogAction
            className="w-full font-semibold text-lg py-6"
            onClick={handleSwap}>
            Confirm {isMinting ? 'Mint' : 'Burn'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
