import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';
import SwapSuccessContent from './Alerts/SwapSuccessContent';
import ProcessingContent from './Alerts/ProcessingContent';
import ConfirmSwapContent from './Alerts/ConfirmSwapContent';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
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

  const { writeContract, data: txHash } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast.success('Swap Initiated');
      },
      onError: (error: any) => {
        setStep(1);
        toast.error(error.shortMessage ? error.shortMessage : error.message);
      },
    },
  });

  const result = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const tx = useMemo(() => result, [result]);

  const { address } = useAccount();
  async function handleClose() {
    onClose();
    await sleep(500);
    setStep(1);
  }

  async function handleSwap() {
    writeContract({
      abi: abi.abi,
      address: '0x94f007172A4128315Bcc117700fC31E79c42B0a6',
      functionName: 'buy',
      args: [parseEther('0.08'), address],
    });

    setStep(2);
  }

  useEffect(() => {
    if (tx?.isSuccess && step === 2) {
      toast.success('Swap successful!!');
      setStep(3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tx]);

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent className={cn(step > 1 && 'w-80')}>
        {step === 1 ? (
          <ConfirmSwapContent isMinting={isMinting} handleSwap={handleSwap} />
        ) : null}
        {step === 2 ? <ProcessingContent txHash={txHash} /> : null}
        {step === 3 ? <SwapSuccessContent txHash={txHash} /> : null}
      </AlertDialogContent>
    </AlertDialog>
  );
}
