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
import { VAULT_ADDRESS } from '@/contract/contract';

type AlertProps = {
  open: boolean;
  onClose: () => void;
  isMinting: boolean;
  fee: number | null;
  price: number | null;
};

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Alerts({
  open,
  onClose,
  isMinting,
  price,
  fee,
}: AlertProps) {
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
      abi,
      address: VAULT_ADDRESS,
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
          <ConfirmSwapContent
            isMinting={isMinting}
            handleSwap={handleSwap}
            price={price}
            fee={fee}
          />
        ) : null}
        {step === 2 ? <ProcessingContent txHash={txHash} /> : null}
        {step === 3 ? <SwapSuccessContent txHash={txHash} /> : null}
      </AlertDialogContent>
    </AlertDialog>
  );
}
