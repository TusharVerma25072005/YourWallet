import { useState } from "react";
import axios from "axios";
import URL from "../URL";
import { useRecoilState } from "recoil";
import { balance } from "../atoms";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchedUsers } from "../types/FetchedUsers";

function Transfer(){
    return (
        <div>
            <TransferCard />
        </div>
    )
}

function TransferCard(){
    const Navigate = useNavigate()
    if(!localStorage.getItem("token")){
        Navigate('/login')
    }
    
    const [Users, setUsers] = useState<fetchedUsers[]>([]);
    const [search, setSearch ] = useState('');
    const [user, setUser] = useState<fetchedUsers | null>(null);
    return (
        <>
        <div className="flex flex-col bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-4 h-auto min-h-screen/2">
        <span>
                <button onClick={()=>{
                    Navigate('/');
                }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
</svg>
</button>
            </span>
    <h1 className="text-2xl font-bold mb-4">Transfer</h1>
    <div className="flex space-x-4 mb-4">
        <input className="border-2 border-gray-300 p-2 rounded-md flex-grow" type="text" placeholder="Search for user" onChange={(e)=>{
            setSearch(e.target.value);
        }}/>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={()=>{
            axios.get(URL + "/users/search?name="+search, {
                headers : {
                    Authorization : "Bearer "+localStorage.getItem("token")
                }
            }
            ).then((response)=>{
                console.log("Users found");
                setUser(null)
                setUsers(response.data.users);
            }).catch((error)=>{
                console.log("Error in fetching users", error);
            });
        }}>Search</button>
    </div>
    <div>
        {!user ? <div> {Users.map((user)=>{
            return (
                <div key={user.id} className="flex justify-between items-center border-b border-gray-200 py-2">
                    <div>
                        <span className="font-semibold">{user.name}</span>
                        <span className="text-sm text-gray-500 ml-2">{user.email}</span>
                    </div>
                    <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={()=>{
                        setUser(user);
                    }}>Transfer</button>
                </div>
            )
        })}
        </div> : <div>
            <SendMoneyCard user={user} setUser ={setUser}/>
            </div>}
    </div>
</div>
</>
    )
}

function SendMoneyCard({user, setUser} : {user : fetchedUsers, setUser : Function}){
    const [Balance, setBalance] = useRecoilState(balance);
    const [amount, setAmount] = useState(0);


    


    return (
        <>
        
        <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto mt-4 h-auto min-h-screen/2">
    <h1 className="text-3xl font-bold mb-4 text-center">Send Money</h1>
    <div className="mb-4 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl mb-2 mx-auto">
            {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="font-semibold text-lg">{user.name}</span>
        <span className="text-sm text-gray-500 ml-2">{user.email}</span>
    </div>
    <div className="flex space-x-4">
        <input className="border-2 border-gray-300 p-2 rounded-md flex-grow text-lg" type="number"  placeholder="Amount" onChange={(e)=>{
            setAmount(parseInt(e.target.value));
        }}/>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={()=>{
            axios.put(URL+"/accounts/transfer", {
                to : user.id,
                amount
            }, {
                headers : {
                    Authorization : "Bearer "+localStorage.getItem("token")
                }
            }).then((response)=>{
                console.log("Money transferred");
                setAmount(0);
                setBalance(Balance-amount);
                setUser(null);
                toast.success(response.data.message, {
                    style : {
                        backgroundColor : "#4B5563",
                        color : "white"
                    }

                });
                
            }).catch((error)=>{
                console.log("Error in transferring money", error);
                toast.error("Transaction Failed", {
                    style : {
                        backgroundColor : "#4B5563",
                        color : "white"
                    }
                });
            });
        }}>Transfer</button>
    </div>
</div>

</>


)
}



export default Transfer