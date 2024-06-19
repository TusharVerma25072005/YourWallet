import { useEffect } from "react";
import axios from "axios";
import URL from "../URL";
import { useRecoilState } from "recoil";
import { balance } from "../atoms";

function Balancecard() {
    const [Balance, setBalance] = useRecoilState(balance);
    useEffect(() => {
        const intervalid = setInterval(() => {
        axios.get(URL + "/accounts/balance", {
            headers: {
                Authorization : "Bearer "+localStorage.getItem("token")
            }
        }).then((response) => {
            setBalance(response.data.balance.balance);
        }).catch((error) => {
            console.log("Error in fetching balance", error);
        })}, 1000);
        return () => {
            clearInterval(intervalid);
        }
        
    })
    return (
        <div className="px-2 py-3 text-white">
            <div className=" bg-gradient-to-r from-cyan-800 to-violet-800 pl-3 p-2 rounded flex flex-col m-1">
                <span className="my-2 mx-2">Your Wallet Balance : </span>
                <span className="text-6xl my-2 mb-3 font-bold"> $ { Balance }  </span>
            </div>
        </div>
    );
}

export default Balancecard;