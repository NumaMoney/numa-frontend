import {
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SwapSuccessContent({ txHash }: { txHash?: string }) {
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
          src="/successIcon.png"
          width={60}
          height={60}
          alt="Success"
          className="mx-auto"
        />
        <h3 className="mt-4 text-lg">Swap successful!!</h3>
        {txHash ? (
          <Link
            target="_blank"
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            className="text-xs mt-2 text-blue-500">
            View on Explorer
          </Link>
        ) : null}
      </div>
      <AlertDialogFooter className="mt-4">
        {/* <AlertDialogAction className="w-full font-semibold text-lg py-6">
              Close
            </AlertDialogAction> */}
      </AlertDialogFooter>
    </>
  );
}
