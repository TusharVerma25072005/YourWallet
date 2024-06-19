import {useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import URL from "../URL";
import "../index.css";
function Register(){
    const navigate = useNavigate();
    const [ErrorMessage , setErrorMessage] = useState("");
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");

    return (
        <div className="h-screen lg:grid grid-cols-3 ">
            <div className="col-span-2 text-7xl font-bold place-self-center ml-10 hidden md:block">
                    <div className="flex justify-center">
                        <div>
                            
                    <span>
                        Your
                    </span>
                    <span className="bg-blue-800 text-white p-1 px-2 mx-1 rounded">
                        Wallet
                    </span>
                        </div>
                    </div>
                    <br></br>
                    <span className="font-mono blinker">
                        Your Gateway to Digital Currency

                    </span>
                </div>
            <div className="p-11 text-lg  py-36 bg-blue-800">
            <div className="flex flex-col  bg-white  p-4 flex justify-center">
            <span className="flex justify-center text-3xl font-bold">
                <span className="p-1">Your </span>
                <span className="text-white bg-blue-800 rounded p-1"> Wallet</span>
            </span>
            <span className="text-xl font-bold flex justify-center my-6">Signup </span>
            <br></br>

            <label >Name : </label>
            <input className="outline-none p-1" type="text" placeholder="Username" onChange={(e)=>{
                setName(e.target.value);
            }}/>
            <label >Email : </label>
            <input className="outline-none p-1" type="text" placeholder="Email" onChange={(e)=>{
                setEmail(e.target.value);
            }}/>
            <label >Password</label>
            <input className="outline-none p-1" type="password" placeholder="Password" onChange={(e)=>{
                setPassword(e.target.value);
            }}/>
            <label >Confirm Password</label>
            <input className="outline-none p-1" type="password" placeholder="Confirm Password" onChange={(e)=>{
                setConfirmPassword(e.target.value);
            }}/><br></br>
            
            <span className="flex justify-center">

            <button onClick={()=>{
                console.log("Register clicked");
                if(password !== confirmPassword){
                    setErrorMessage("Passwords do not match");
                    return;
                }
                axios.post(URL+"/users/register", {
                    name : name,
                    email : email,
                    password : password
                }).then((response)=>{
                    console.log("Register successfull");
                    localStorage.setItem("token", response.data.token);
                    navigate("/");
                }).catch((error)=>{
                    console.log("Register failed");
                    setErrorMessage(error.response.data.message);
                });
            }} className= "w-64 rounded shadow-lg shadow-blue-200 font-bold text-white p-2 bg-blue-800 hover:bg-blue-700  ">Register</button>
            </span>
            <span className=" p-2 mt-2 text-cyan-800 underline text-sm ">Already a User ? <Link to="/login">Login</Link></span>
            <span className=" p-2 text-sm text-red-800">{ErrorMessage}</span>
            </div>
                </div>
        </div>
    )
}

export default Register