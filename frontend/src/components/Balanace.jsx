import React, { useEffect, useState } from 'react'
import axios from "axios"

function Balanace() {

  const [balance, setBalance] = useState("")

  useEffect(()=> {
    async function get(){
      try {
        const tokenStr = localStorage.getItem("token")
        const response = await axios.get(`https://paytm-wallet-lh5s.onrender.com/api/v1/account/balance` , { headers: {"Authorization" : `Bearer ${tokenStr}`} })
        console.log(response)
    
        setBalance(response.data.balance)

      } catch (error) {
        console.log("Balance error - " , error)
      }
    }

    get()
  },[])

  return (
    <h1 className='text-[1rem] font-semibold self-start pl-[0.5rem]'>Your Balanace is <span className='text-[1.2rem] font-bold'>{balance}</span></h1>
  )
}

export default Balanace