import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { Loader2, MoveRight, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import { useState } from 'react';

type AlertProps = {
  open: boolean;
  onClose: () => void;
  isMinting: boolean;
};

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Alerts({ open, onClose, isMinting }: AlertProps) {
  const [step, setStep] = useState(1);

  async function handleClose() {
    onClose();
    await sleep(400);
    setStep(1);
  }

  async function handleSwap() {
    setStep(2);

    await sleep(4000);

    setStep(3);
  }

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent className={cn(step > 1 && 'w-80')}>
        {step === 1 ? (
          <ConfirmSwapContent isMinting={isMinting} handleSwap={handleSwap} />
        ) : null}
        {step === 2 ? <ProcessingContent /> : null}
        {step === 3 ? <SwapSuccessContent /> : null}
      </AlertDialogContent>
    </AlertDialog>
  );
}

function ConfirmSwapContent({ isMinting, handleSwap }: any) {
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
        <Button
          className="w-full font-semibold text-lg py-6"
          onClick={handleSwap}>
          Confirm {isMinting ? 'Mint' : 'Burn'}
        </Button>
      </AlertDialogFooter>
    </>
  );
}

function ProcessingContent() {
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-center justify-end">
          <AlertDialogCancel className="p-1/2 border-0 h-max ml-auto rounded-full">
            {/* <X size={18} /> */}
          </AlertDialogCancel>
        </AlertDialogTitle>
      </AlertDialogHeader>
      <div className="flex flex-col justify-center items-center">
        <Loader2 size={60} className="animate-spin" />

        <h3 className="mt-4 text-lg">Processing</h3>
        {/* <a href="#" className="text-xs mt-2 text-blue-500">
          View on Explorer
        </a> */}
      </div>
      <AlertDialogFooter className="mt-5">
        <p className="text-xs mx-auto text-gray-600">Proceed on your wallet</p>
        {/* <AlertDialogAction className="w-full font-semibold text-lg py-6">
            Close
          </AlertDialogAction> */}
      </AlertDialogFooter>
    </>
  );
}

function SwapSuccessContent() {
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-center justify-end">
          <AlertDialogCancel className="p-1/2 border-0 h-max ml-auto rounded-full">
            <X size={18} />
          </AlertDialogCancel>
        </AlertDialogTitle>
      </AlertDialogHeader>
      <div className="flex flex-col justify-center items-center">
        <Image
          src="/success.png"
          width={60}
          height={60}
          alt="Success"
          className="mx-auto"
        />
        <h3 className="mt-4 text-lg">Swap success!</h3>
        <a href="#" className="text-xs mt-2 text-blue-500">
          View on Explorer
        </a>
      </div>
      <AlertDialogFooter className="mt-4">
        {/* <AlertDialogAction className="w-full font-semibold text-lg py-6">
            Close
          </AlertDialogAction> */}
      </AlertDialogFooter>
    </>
  );
}
