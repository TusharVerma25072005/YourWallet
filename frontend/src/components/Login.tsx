import URL from "../URL";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { user } from "../atoms";
import { useSetRecoilState } from "recoil";
import "../index.css";

function Login() {
    const navigate = useNavigate();
    const setUser = useSetRecoilState(user);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="h-screen lg:grid grid-cols-3 ">
            <div className="p-11 text-lg  py-36 bg-blue-800">
                <div className="flex flex-col  bg-white  p-4 flex justify-center">
                    <span className="flex justify-center text-3xl font-bold">
                        <span className="p-1">Your </span>
                        <span className="text-white bg-blue-800 rounded p-1"> Wallet</span>
                    </span>
                    <span className="text-xl font-bold flex justify-center my-6">Login to your Account </span>
                    <br></br>
                    <label >Email : </label>
                    <input className="outline-none p-1" type="text" placeholder="John@example.com" onChange={(e) => {
                        setEmail(e.target.value);
                    }} /><br></br>
                    <label >Password : </label>
                    <input className="p-1 outline-none" type="password" placeholder="Password" onChange={(e) => {
                        setPassword(e.target.value);
                    }} /><br></br>
                    <span className="flex justify-center">
                        <button onClick={() => {
                            console.log("Login clicked");
                            axios.post(URL + "/users/login", {
                                email: email,
                                password: password
                            }).then((response) => {
                                localStorage.setItem("token", response.data.token);
                                setUser(response.data.user);
                                console.log("Login successfull");
                                window.location.href = "/";
                               
                            }).catch((error) => {
                                console.log("Login failed");
                                setErrorMessage(error.response.data.message);
                            });
                        }} className="w-64 rounded shadow-lg shadow-blue-200 font-bold text-white p-2 bg-blue-800 hover:bg-blue-700  ">Login</button><br></br>
                    </span>
                    <span className=" p-2 mt-2 text-cyan-800 underline text-sm ">Not a User ? <Link to="/Register">Register</Link></span>
                    <span className=" p-2 text-sm text-red-800">{ErrorMessage}</span>
                </div>
            </div>
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
        </div>
    )
}

export default Login