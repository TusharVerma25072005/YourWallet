import { useNavigate } from "react-router-dom";
function OptionsCard() {
  const navigate = useNavigate();
  return (
    <div className='border-2 m-3 p-2 rounded grid grid-cols-3 gap-4'>
      <span className="col-span-1 flex flex-col items-center justify-center bg-emerald-500 text-white p-2 rounded">    <button onClick={() => navigate("/transfer")} className="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

        <span>Send Money</span>
      </button>
      </span>
      <span className="col-span-1 flex flex-col items-center justify-center bg-teal-500 text-rose-200 p-2 rounded">    <button onClick={() => navigate("/transactions")} className="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>

        <span>Show Transactions</span>
      </button>
      </span>
      <span className="col-span-1 flex flex-col items-center justify-center bg-cyan-500 text-violet-200 p-2 rounded">    <button onClick={() => navigate("/profile")} className="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>

        <span>Account</span>
      </button>
      </span>
    </div>
  )
}

export default OptionsCard
//
