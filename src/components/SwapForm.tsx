import { connectorAtom, numaInputAtom, rEthInputAtom } from '@/lib/atom';
import formatAddress from '@/lib/formatAddress';
import { cn } from '@/lib/utils';
import { useAtom, useSetAtom } from 'jotai';
import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { erc20Abi, formatEther, parseEther } from 'viem';
import {
  useAccount,
  useConnections,
  useDisconnect,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { Button } from './ui/button';
import { ArrowDownUp } from 'lucide-react';
import { sepolia,arbitrum } from 'viem/chains';
import { toast } from 'sonner';
import { ETH_ADDRESS, NUMA_ADDRESS, VAULT_ADDRESS } from '@/contract/contract';

export default function SwapForm({
  rEthEst,
  numaEst,
  fee,
  setShowAlerts,
  numaPrice,
  isMinting,
  token,
  rEthMaxLimit,
  setIsMinting,
  refetch,
}: any) {
  const [numa, setNuma] = useAtom(numaInputAtom);
  const [rEth, setEth] = useAtom(rEthInputAtom);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const setShowConnectors = useSetAtom(connectorAtom);
  const { switchChain } = useSwitchChain();
  const connections = useConnections();

  const { writeContract, data: txHash } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast.success('Approval transaction pending');
      },
      onError: (error: any) => {
        console.log(error);
        toast.error(error.shortMessage ? error.shortMessage : error.message);
      },
    },
  });

  const tx = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (tx?.isSuccess) {
      toast.success('Approved! You may now proceed with your swap');
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tx?.isSuccess]);

  useEffect(() => {
    if (!rEthEst?.result) return;

    if (isMinting) {
      setNuma((Number(formatEther(numaEst.result)) * Number(rEth)).toString());
    } else {
      setEth((Number(formatEther(rEthEst.result)) * Number(numa)).toString());
    }

  }, [rEthEst?.result]);
  
  function handleNumaChange(e: ChangeEvent<HTMLInputElement>) {
    setNuma(e.target.value);

    if (typeof rEthEst?.result === 'bigint') {
      setEth(
        (
          Number(formatEther(rEthEst.result)) * Number(e.target.value)
        ).toString()
      );
    }
  }

  function handleEthChange(e: ChangeEvent<HTMLInputElement>) {
    setEth(e.target.value);

    if (Number(e.target.value)> rEthMaxLimit)
    {
      let text = `To proceed, please split into more than one transaction. The protocol limits single transactions to 10% of the vault value to prevent manipulation. At present, each transaction should be less than ${Math.round(Number(rEthMaxLimit) * 1000) / 1000} rETH. You are free to submit as many transactions as you wish`;
      toast.error(text, { duration: 10000 });
    }



    if (typeof numaEst?.result === 'bigint') {
      setNuma(
        (
          Number(formatEther(numaEst.result)) * Number(e.target.value)
        ).toString()
      );
    }
  }

  function switchNetwork() {
    //switchChain({ chainId: sepolia.id });
    switchChain({ chainId: arbitrum.id });
  }

  function handleFlip() {
    setIsMinting(!isMinting);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isMinting && Number(token?.ethAllowance) < Number(rEth)) {
      writeContract({
        abi: erc20Abi,
        address: ETH_ADDRESS,
        functionName: 'approve',
        args: [VAULT_ADDRESS, parseEther(rEth)],
      });
      toast.info('Proceed in wallet');

      return;
    }

    if (!isMinting && Number(token?.numaAllowance) < Number(numa)) {
      writeContract({
        abi: erc20Abi,
        address: NUMA_ADDRESS,
        functionName: 'approve',
        args: [VAULT_ADDRESS, parseEther(numa)],
      });

      toast.info('Proceed in wallet');

      return;
    }

    setShowAlerts(true);
  }

  // let onSepolia = true;
  // if (isConnected && connections[0].chainId !== sepolia.id) {
  //   onSepolia = false;
  // }

  let onArbitrum = true;
  if (isConnected && connections[0].chainId !== arbitrum.id) {
    onArbitrum = false;
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="mt-32 max-w-lg flex flex-col z-10 bg-background p-10 rounded-2xl shadow-[0px_0px_10px_4px_#0000002f]">
      <h3 className="text-2xl font-semibold">
        {isMinting ? 'Mint $NUMA' : 'Redeem $rETH'}
      </h3>
      <p className="mt-1 text-[#545b76] mb-5">
        {isMinting
          ? 'Deposit $rETH into the vault to mint $NUMA'
          : 'Burn $NUMA to remove $rETH from the vault'}
      </p>
      {address ? (
        <span className="w-full flex items-center justify-between text-sm mb-5">
          <p>
            Connected addr. <strong>{formatAddress(address)}</strong>
          </p>
          <p
            className="mt-0 font-semibold cursor-pointer hover:underline"
            onClick={() => disconnect()}>
            Disconnect?
          </p>
        </span>
      ) : null}

      <div className="flex flex-col">
        <div
          className={cn(
            'order-1 w-full flex flex-col gap-2 rounded-2xl bg-[#16181fd2] p-4 mb-2',
            !isMinting && 'order-3'
          )}>
          <span className="w-full flex items-center justify-between text-sm text-gray-600">
            {isMinting ? <p>You pay</p> : <p>You receive</p>}
            {token?.ethBalance ? (
              <p className="whitespace-nowrap">
                Balance: {Number(token?.ethBalance).toFixed(5)}
              </p>
            ) : (
              <p className="whitespace-nowrap">Balance: 0</p>
            )}
          </span>
          <span className="w-full flex items-center justify-between text-sm">
            <input
              type="number"
              placeholder="0"
              value={rEth}
              onChange={handleEthChange}
              className="w-full text-4xl border-0 outline-0 bg-transparent number-input"
            />
            <span className="flex min-w-max items-center text-sm rounded-2xl px-2 py-1 gap-2 bg-[#0d0e12]">
              <Image
                src="/rEthIcon.png"
                width={20}
                height={20}
                alt="rEth"
                className="rounded-full"
              />
              <p>rETH</p>
            </span>
          </span>
        </div>

        <span
          onClick={handleFlip}
          className="order-2 w-max h-max p-2 rounded-full bg-background text-[#3d4154] flex item-center justify-center mx-auto -my-5 z-10 cursor-pointer hover:bg-[#1b1e25] hover:text-[#8a90a5]">
          <ArrowDownUp />
        </span>

        <div
          className={cn(
            'order-3 w-full flex flex-col gap-2 rounded-2xl bg-[#16181fd2] p-4 mb-2',
            !isMinting && 'order-1'
          )}>
          <span className="w-full flex items-center justify-between text-sm text-gray-600">
            {!isMinting ? <p>You pay</p> : <p>You receive</p>}
            {token?.numaBalance ? (
              <p className="whitespace-nowrap">
                Balance: {Number(token?.numaBalance).toFixed(5)}
              </p>
            ) : (
              <p className="whitespace-nowrap">Balance: 0</p>
            )}
          </span>
          <span className="w-full flex items-center justify-between text-sm">
            <input
              type="number"
              placeholder="0"
              value={numa || ''}
              onChange={handleNumaChange}
              className="w-full text-4xl border-0 outline-0 bg-transparent number-input"
            />
            <span className="flex min-w-max items-center text-sm rounded-2xl px-2 py-1 gap-2 bg-[#0d0e12]">
              <Image
                src="/numaIcon.png"
                width={20}
                height={20}
                alt="numa"
                className="rounded-full"
              />
              <p>NUMA</p>
            </span>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-1 text-[#979fc1]">
        {numaPrice ? <p>Price: ${numaPrice.toFixed(5)}</p> : <p></p>}
        {/* <p>Fee: {fee}%</p> */}
      </div>

      <Buttons
        //onSepolia={onSepolia}
        onArbitrum={onArbitrum}
        isConnected={isConnected}
        tx={tx}
        setShowConnectors={setShowConnectors}
        switchNetwork={switchNetwork}
        isMinting={isMinting}
        rEthMaxLimit = {rEthMaxLimit}
        token={token}
        numa={numa}
        rEth={rEth}
      />
    </form>
  );
}

function Buttons({
  //onSepolia,
  onArbitrum,
  isConnected,
  tx,
  setShowConnectors,
  switchNetwork,
  isMinting,
  rEthMaxLimit,
  token,
  numa,
  rEth,
}: any) {
  if (!isConnected) {
    return (
      <Button
        type="button"
        className="rounded-lg py-6 text-lg font-semibold mt-4"
        onClick={() => setShowConnectors(true)}>
        Connect
      </Button>
    );
  }

  // if (!onSepolia) {
  //   return (
  //     <Button
  //       type="button"
  //       variant="destructive"
  //       onClick={switchNetwork}
  //       className="rounded-lg py-6 text-lg font-semibold mt-4">
  //       Switch to Sepolia
  //     </Button>
  //   );
  // }

  if (!onArbitrum) {
    return (
      <Button
        type="button"
        variant="destructive"
        onClick={switchNetwork}
        className="rounded-lg py-6 text-lg font-semibold mt-4">
        Switch to Arbitrum
      </Button>
    );
  }


  if (tx?.isLoading) {
    return (
      <Button
        disabled={true}
        type="submit"
        className="rounded-lg py-6 text-lg font-semibold mt-4">
        Waiting for approval...
      </Button>
    );
  }

  // ttc
  if (
    (isMinting && Number(rEthMaxLimit) < Number(rEth)) )
   {
    return (
      <Button
      disabled={true}
        type="submit"
        className="rounded-lg py-6 text-lg font-semibold mt-4">
        Max transaction = {Math.round(Number(rEthMaxLimit) * 1000) / 1000} rETH
      </Button>
    );
  }

  if (
    (isMinting && Number(token?.ethBalance) < Number(rEth)) ||
    (!isMinting && Number(token?.numaBalance) < Number(numa))
  ) {
    return (
      <Button
      disabled={true}
        type="submit"
        className="rounded-lg py-6 text-lg font-semibold mt-4">
        Not enough balance
      </Button>
    );
  }



  if (
    (isMinting && Number(token?.ethAllowance) < Number(rEth)) ||
    (!isMinting && Number(token?.numaAllowance) < Number(numa))
  ) {
    return (
      <Button
        type="submit"
        className="rounded-lg py-6 text-lg font-semibold mt-4">
        Approve
      </Button>
    );
  }

  return (
    <Button
      disabled={numa === '0' || rEth === '0' || tx?.isLoading}
      type="submit"
      className="rounded-lg py-6 text-lg font-semibold mt-4">
      {tx?.isLoading ? 'Waiting for approval...' : null}
      {tx?.isLoading ? null : isMinting ? 'Mint $NUMA' : 'Burn $NUMA'}
    </Button>
  );
}
