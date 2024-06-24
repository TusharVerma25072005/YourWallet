import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sentTransactions, receivedTransactions } from '../atoms';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import URL from '../URL';
import TransactionList from './TransactionList';


export default function TransactionsCard(){
    const Navigate = useNavigate()
    if(!localStorage.getItem("token")){
        Navigate('/login')
    }
    

    const [sent, setSent] = useRecoilState(sentTransactions);
    const [received, setReceived] = useRecoilState(receivedTransactions);
    const [type, setType] = useState("sent");
    useEffect(()=>{
            axios.get(URL+"/accounts/sent", {
                headers : {
                    Authorization : "Bearer "+localStorage.getItem("token")
                }
            }).then((response)=>{
                console.log("Sent transactions fetched");
                setSent(response.data.sent);
            }).catch((error)=>{
                console.log("Error in fetching sent transactions", error);
            });
            axios.get(URL+"/accounts/recieved", {
                headers : {
                    Authorization : "Bearer "+localStorage.getItem("token")
                }
            }).then((response)=>{
                console.log("Received transactions fetched");
                setReceived(response.data.recieved);
            }).catch((error)=>{
                console.log("Error in fetching received transactions", error);
            });
        
        
    }, [type]);

    return (
        <div className="flex flex-col bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto mt-4 h-auto min-h-screen/2">
    <span>
                <button onClick={()=>{
                    Navigate('/');
                }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
</svg>
</button>
            </span>
            <br />
    <h1 className="text-2xl font-bold mb-4">Transactions History</h1>
    <div className="flex space-x-4 mb-4">
        <button className="flex px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => {
            setType("sent");
        }}>Sent  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
      </button>
        <button className=" flex px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => {
            setType("received");
        }}>Received  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
      </svg>
      
      </button>
    </div>
    <div>
        {type === "sent" ? <TransactionList transactions={sent}/> : <TransactionList transactions={received}/>}
    </div>
</div>
    )
}