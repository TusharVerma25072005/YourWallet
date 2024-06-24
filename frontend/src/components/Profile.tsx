import { useRecoilState } from 'recoil'
import { user } from '../atoms'
import { useEffect,useState } from 'react';
import axios from 'axios';
import URL from '../URL';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserType } from '../types/UserType';

function Profile(){
    return (
        <div>
            <ProfileCard />
        </div>
    )
}

function ProfileCard(){
    const Navigate = useNavigate()
    if(!localStorage.getItem("token")){
        Navigate('/login')
    }
    
    const [showUpdate, setShowUpdate] = useState(false);
    const [User,setUser] = useRecoilState<UserType>(user);
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login'
    }
    axios.get(URL + "/users/me", {
        headers: {
            Authorization : "Bearer "+localStorage.getItem("token")
        }
    }).then((response) => {
        console.log("User fetched");
        setUser(response.data.user);
    }
    ).catch((error) => {
        console.log("Error in fetching user", error);
    })


  }, [])
    return (
        <div>
            
            { !showUpdate ? 
            (<div ><div className="flex flex-col bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-16 ">
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
                <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
                        {User.name && User.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{User.name}</h1>
                        <p className="text-sm text-gray-500">ID: {User.id}</p>
                    </div>
                </div>
                <br />
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-700">Email:</h2>
                    <br />
                    <p className="text-gray-800">{User.email}</p>
                </div>
                <br />
                

                <div className="mt-6 self-center ">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={()=>{
                        setShowUpdate(true);
                    }}>Edit Profile</button>
                </div>
                    
                </div>
        </div>
        ):<div>
            <UpdateCard />
            <div className="mt-6 flex justify-center ">
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => {
    setShowUpdate(false);
}}>Cancel</button>
</div>
        </div> }

        </div>
    )
}

function UpdateCard(){
    const [User, setUser] = useRecoilState<UserType>(user);
    const [email, setEmail] = useState(User.email);
    const [name, setName] = useState(User.name);
    const [ErrorMessage, setErrorMessage] = useState("");
    return (
        <div className="flex flex-col bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-4 h-auto min-h-screen/2">
    <h1 className="text-2xl font-bold mb-4">Update your details</h1>
    <label className="text-lg font-semibold text-gray-700 mb-2">Name :</label>
    <input className="border-2 border-gray-300 p-2 mb-4 rounded-md outline-none" type="text" value={name} onChange={(e) => {
        setName(e.target.value);
    }} />
    <label className="text-lg font-semibold text-gray-700 mb-2">Email :</label>
    <input className="border-2 border-gray-300 p-2 mb-4 rounded-md outline-none" type="text" value={email} onChange={(e) => {
        setEmail(e.target.value);
    }} />
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4" onClick={() => {
        
        axios.put(URL + "/users/me", {
            email: email,
            name: name
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => {
            setUser(response.data.updateduser);
            console.log("Update successfull");
            toast.success("Profile updated successfully", {
                style: {
                    backgroundColor: "#4B5563",
                    color: "white"
                }
            
            });
        }).catch((error) => {
            console.log("Update failed");
            toast.error(error.response.data.message, {
                style: {
                    backgroundColor: "#4B5563",
                    color: "white"
                }
            });
            setErrorMessage(error.response.data.message);
        });
    }}>Update</button>
    <span className="text-red-500">{ErrorMessage}</span>
</div>
    )
}


export default Profile