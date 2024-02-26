import React, { useState, useEffect } from 'react'
import Button from '../components/Button';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


function Sendmoney() {

  const navigate = useNavigate();

  useEffect(() => {
    const token  = localStorage.getItem("token") || false

    const verify = async () => {
      try {
        
        const response = await axios.get("http://localhost:8000/api/v1/user/verifyme", { headers: { "Authorization": `Bearer ${token}` } });

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

  const [amount, setAmount] = useState(0)
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id") || ""
  const name = searchParams.get("name") || ""

  const onClick = async() => {
    try {
        const tokenStr = localStorage.getItem("token")
        const response = await axios.post("http://localhost:8000/api/v1/account/transfer",
        {to: id, amount: amount}, 
        { headers: {"Authorization" : `Bearer ${tokenStr}`} })

        console.log(response.data)
        navigate("/dashboard")
    } catch (error) {
        console.log("Tran error" , error.response)
    }
  }

  return (
    <div className='container gap-[1rem]'>
        <h1 className='text-[1.5rem] font-bold'>Send Money</h1>

        <div className="w-[100%] flex items-center justify-start gap-[1rem] mt-[2rem]">
                    <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center">
                        <span className="text-2xl">{name[0]}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
        </div>

        <div className='w-[100%] flex flex-col gap-[0.5rem] mt-[1rem]'>
              <label
                  className="text-sm font-medium text-zinc-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-[0.1rem]"
                  htmlFor="amount"
              >
                  Amount (in Rs)
              </label>
              <input
                  type="number"
                  className="outline outline-offset-2 outline-[0.5px] rounded-[2px] px-[0.5rem] py-[0.2rem] outline-zinc-400"
                  id="amount"
                  placeholder="Enter amount"
                  onChange={(e) => {setAmount(e.target.value)}}
              />
        </div>
        
        <Button title="Initiate Transfer" onClick={onClick}/>

    </div>
  )
}

export default Sendmoney