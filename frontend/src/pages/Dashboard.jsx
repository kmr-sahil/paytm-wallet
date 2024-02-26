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
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

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
    async function get() {
      try {
        setLoad(true);
        const tokenStr = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/v1/user/bulk?filter=" + filter, { headers: { "Authorization": `Bearer ${tokenStr}` } });
        setUsers(response.data.user);
      } catch (error) {
        console.log("Bulk error - ", error.response);
        setError(error.response?.data?.message || "An error occurred");
      } finally {
        setLoad(false);
      }
    }

    get();
  }, [filter]);


  const onLogout = () => {
    localStorage.removeItem("token")
    navigate("/signin")
  }


  return (
    <div className='relative flex flex-col gap-[1rem] justify-end items-center p-[1rem]'>

      {load && (
        <div role="status" className='absolute bg-blue-50 p-[1rem] rounded-md border border-blue-200'>
          <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-400 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
        </div>
      )}

      {error && <span className='w-[15rem] text-center absolute bg-blue-50 p-[1rem] rounded-md border border-blue-200'>{error}</span>}

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