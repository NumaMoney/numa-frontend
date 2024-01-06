import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { MoveRight, X } from 'lucide-react';
import Image from 'next/image';

type AlertProps = {
  open: boolean;
  onClose: () => void;
};

export default function Alerts({ open, onClose }: AlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <p>Review Mint</p>
            <AlertDialogCancel className="p-1/2 border-0 h-max ml-auto rounded-full bg-foreground text-background">
              <X size={18} />
            </AlertDialogCancel>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-8 mt-4">
          <div className="flex items-center justify-between gap-6">
            <div className="flex flex-col text-sm">
              <p className="text-gray-400 mb-4">You&apos;re spending</p>
              <span className="flex gap-2 items-center">
                <Image
                  src="/rEthIcon.png"
                  width={30}
                  height={30}
                  alt="rEth"
                  className="rounded-full"
                />
                <p className="text-lg">rETH</p>
              </span>
              <h3 className="text-2xl mt-2">{Number(2).toFixed(2)} rETH</h3>
            </div>
            <MoveRight size={40} />
            <div className="flex flex-col text-sm">
              <p className="text-gray-400 mb-4 ml-auto">
                You&apos;re receiving
              </p>
              <span className="flex gap-2 items-center ml-auto">
                <p className="text-lg">NUMA</p>
                <Image
                  src="/numaIcon.png"
                  width={30}
                  height={30}
                  alt="numa"
                  className="rounded-full"
                />
              </span>
              <h3 className="text-2xl mt-2">{Number(4).toFixed(2)} NUMA</h3>
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
          <AlertDialogAction className="w-full font-semibold text-base">
            Confirm Mint
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
