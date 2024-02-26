import {React, useEffect, useState} from 'react'
import Balanace from '../components/Balanace';
import User from '../components/User';
import axios from "axios"
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom'


function Dashboard() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("")
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const token  = localStorage.getItem("token") || false

    const verify = async () => {
      try {
        
        const response = await axios.get("http://localhost:8000/api/v1/user/verifyme", { headers: { "Authorization": `Bearer ${token}` } });
        setUsername(response.data.user);

      } catch (error) {
        console.error("Verification error:", error);
        navigate("/signin");
      }
    };

    if(!token){
      navigate("/signin")
    } else {      
      verify()
      return
    } 

  },[])

  useEffect(() => {
      async function get(){
        try {
          const tokenStr = localStorage.getItem("token")
          const response = await axios.get("http://localhost:8000/api/v1/user/bulk?filter=" + filter, { headers: {"Authorization" : `Bearer ${tokenStr}`} })
      
          setUsers(response.data.user)

        } catch (error) {
          console.log("Bulk error - " , error.response)
        }
      }

      get()
  },[filter])

  const onLogout = () => {
    localStorage.removeItem("token")
    navigate("/signin")
  }


  return (
    <div className='flex flex-col gap-[1rem] justify-end items-center p-[1rem]'>

        <div className='w-[100%] sm:w-[38rem] mx-auto px-[1rem] py-[0.5rem] rounded-[8px] flex justify-between items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>

              <h1 className='text-[1.5rem] font-bold'>PayTM</h1>

              <div className='flex gap-[1rem] items-center profile'>

                <h3 className='text-[1rem] font-medium'>Hello</h3>

                <div className="relative rounded-full h-12 w-12 bg-blue-200 flex justify-center">
                  <div className="flex flex-col justify-center h-full text-xl">
                      {username[0]}
                  </div>

                  <div className='absolute top-[3rem] right-0 logout'>
                    <Button title="Logout" onClick={onLogout} />
                  </div>
                  
                </div>

              </div>
        </div>

        <div className='w-[100%] sm:w-[36rem] mx-auto'>
            <Balanace/>

            <div className='w-[100%] sm:w-[36rem] p-[0.5rem] flex flex-col gap-[0.5rem]'>
                <h1 className='text-[1rem] font-semibold'>Users</h1>
                <input type="text" 
                       placeholder='search user' 
                       className='w-[100%] outline outline-offset-2 outline-[0.5px] rounded-[2px] px-[0.5rem] py-[0.2rem] outline-zinc-400' 
                       onChange={(e) => {setFilter(e.target.value)}}
                />
                {users.map(user => <User user={user} key={user._id} />)}
            </div>
        </div>
        

    </div>
  )
}

export default Dashboard