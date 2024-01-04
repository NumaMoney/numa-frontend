'use client';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="max-w-md flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold">Burn $NUMA</h3>
        <p className="mt-1 text-[#757fa6]">
          Lorem ipsum dolor sit amet consectetur
        </p>
        <span className="w-full flex items-center justify-between text-sm my-5">
          <p>
            Burning from <strong>0xfcfc...48d2</strong>
          </p>
          <a href="#" className="mt-0 font-semibold underline">
            Change Wallet?
          </a>
        </span>
        <div className="w-full flex flex-col gap-2 rounded-2xl bg-[#16181fd2] p-4 mb-2">
          <span className="w-full flex items-center justify-between text-sm">
            <p>You pay</p>
            <span className="flex items-center gap-1">
              <p className="whitespace-nowrap">Balance: 1.249</p>
            </span>
          </span>
          <span className="w-full flex items-center justify-between text-sm">
            <input
              type="number"
              placeholder="0"
              className="w-full text-4xl border-0 outline-0 bg-transparent number-input"
            />
            <span className="flex items-center text-sm rounded-2xl px-3 py-1 gap-1 bg-[#0e0e0e]">
              <p>NUMA</p>
            </span>
          </span>
        </div>
        <div className="w-full flex flex-col gap-2 rounded-2xl bg-[#16181fd2] p-4 mb-2">
          <span className="w-full flex items-center justify-between text-sm">
            <p>You receive</p>
            <span className="flex items-center gap-1">
              <p className="whitespace-nowrap">Balance: 1.249</p>
            </span>
          </span>
          <span className="w-full flex items-center justify-between text-sm">
            <input
              type="number"
              placeholder="0"
              className="w-full text-4xl border-0 outline-0 bg-transparent number-input"
            />
            <span className="flex items-center text-sm rounded-2xl px-3 py-1 gap-1 bg-[#0e0e0e]">
              <p>rETH</p>
            </span>
          </span>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg text-gray-900 bg-white p-4 text-base font-semibold border-0 outline-0 cursor-pointer mt-4 hover:bg-gray-200">
          Burn $NUMA
        </button>
      </form>
    </main>
  );
}
