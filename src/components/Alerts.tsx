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
import { erc20Abi, parseEther } from 'viem';
import { NUMA_ADDRESS, VAULT_ADDRESS } from '@/contract/contract';
import { useAtomValue } from 'jotai';
import { numaInputAtom, rEthInputAtom } from '@/lib/atom';

type AlertProps = {
  open: boolean;
  onClose: () => void;
  isMinting: boolean;
  fee: number | null;
  numaPrice: number;
  token: any;
  refetch: () => void;
};

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Alerts({
  open,
  onClose,
  isMinting,
  numaPrice,
  fee,
  token,
  refetch,
}: AlertProps) {
  const [step, setStep] = useState(1);
  const numa = useAtomValue(numaInputAtom);
  const rEth = useAtomValue(rEthInputAtom);

  const { writeContract, data: txHash } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast.success('Swap transaction pending');
      },
      onError: (error: any) => {
        setStep(1);
        console.log(error);
        toast.error(error.shortMessage ? error.shortMessage : error.message);
      },
    },
  });

  const tx = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const { address } = useAccount();
  async function handleClose() {
    onClose();
    await sleep(500);
    setStep(1);
  }

  async function handleSwap() 
  {
    let minStr = isMinting ? rEth : numa;
    let minNb = Number(minStr);
    // adding slippage (0.5% hardcoded for now)
    minNb = minNb - 0.005*minNb;
    minStr = minNb.toString();
    let minBN = parseEther(minStr);
    writeContract({
      abi,
      address: VAULT_ADDRESS,
      functionName: isMinting ? 'buy' : 'sell',

      args: [parseEther(isMinting ? rEth : numa),minBN, address],
    });

    setStep(2);
  }

  useEffect(() => {
    if (tx?.isSuccess && step === 2) {
      toast.success('Swap successful!');
      refetch();
      setStep(3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tx?.isSuccess]);

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent className={cn(step > 1 && 'w-80')}>
        {step === 1 ? (
          <ConfirmSwapContent
            isMinting={isMinting}
            handleSwap={handleSwap}
            numaPrice={numaPrice}
            fee={fee}
          />
        ) : null}
        {step === 2 ? <ProcessingContent txHash={txHash} /> : null}
        {step === 3 ? <SwapSuccessContent txHash={txHash} /> : null}
      </AlertDialogContent>
    </AlertDialog>
  );
}
