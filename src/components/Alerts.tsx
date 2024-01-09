import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import SwapSuccessContent from './Alerts/SwapSuccessContent';
import ProcessingContent from './Alerts/ProcessingContent';
import ConfirmSwapContent from './Alerts/ConfirmSwapContent';
import { useAccount, useWriteContract } from 'wagmi';
import abi from '@/contract/abi.json';
import { toast } from 'sonner';
import { parseEther } from 'viem';

type AlertProps = {
  open: boolean;
  onClose: () => void;
  isMinting: boolean;
};

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Alerts({ open, onClose, isMinting }: AlertProps) {
  const [step, setStep] = useState(1);

  const { writeContractAsync, data: txHash } = useWriteContract({
    // mutation: {
    //   onError: (error) => {
    //     toast.error(error.message);
    //   },
    // onSuccess: () => {
    //   toast.success('Swap Initiated');
    // },
    // },
  });
  const { address } = useAccount();
  async function handleClose() {
    onClose();
    await sleep(400);
    setStep(1);
  }

  async function handleSwap() {
    toast.promise(
      writeContractAsync({
        abi: abi.abi,
        address: '0x94f007172A4128315Bcc117700fC31E79c42B0a6',
        functionName: 'buy',
        args: [parseEther('0.08'), address],
      }),
      {
        loading: 'Waiting for Confirmation',
        success: (data) => {
          setStep(3);
          console.log(data);
          return 'Swap Initiated';
        },
        error: (data) => {
          setStep(1);
          return data.shortMessage;
        },
      }
    );

    setStep(2);
  }

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent className={cn(step > 1 && 'w-80')}>
        {step === 1 ? (
          <ConfirmSwapContent isMinting={isMinting} handleSwap={handleSwap} />
        ) : null}
        {step === 2 ? <ProcessingContent /> : null}
        {step === 3 ? <SwapSuccessContent txHash={txHash} /> : null}
      </AlertDialogContent>
    </AlertDialog>
  );
}
