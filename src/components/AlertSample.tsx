import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from './ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';

type AlertProps = {
  open: boolean;
  onClose: () => void;
};

export default function Alerts({ open, onClose }: AlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <p>Review Mint</p>
            <AlertDialogCancel className="p-1 border-0 h-max ml-auto rounded-full">
              <X size={18} />
            </AlertDialogCancel>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col text-sm">
            <p className="text-gray-600">You pay</p>
            <span className="w-full flex items-center justify-between">
              <h3 className="text-3xl">2.00 rETH</h3>
              <Image
                src="/rEthIcon.png"
                width={50}
                height={50}
                alt="rEth"
                className="rounded-full"
              />
            </span>
            <p className="text-gray-600">$2000</p>
          </div>
          <div className="flex flex-col text-sm">
            <p className="text-gray-600">You receive</p>
            <span className="w-full flex items-center justify-between">
              <h3 className="text-3xl">4.00 NUMA</h3>
              <Image
                src="/numaIcon.png"
                width={50}
                height={50}
                alt="numa"
                className="rounded-full"
              />
            </span>
            <p className="text-gray-600">$2000</p>
          </div>
          <div className="h-[1px] w-full bg-slate-800" />
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <p>Rate</p>
              <p>1 rETH = 2 NUMA</p>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <p>Fee</p>
              <p>$0</p>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
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
