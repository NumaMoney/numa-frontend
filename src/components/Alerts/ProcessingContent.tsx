import {
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';

export default function ProcessingContent() {
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
