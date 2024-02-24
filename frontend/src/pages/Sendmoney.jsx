import React from 'react'
import Button from '../components/Button';
import { useSearchParams } from 'react-router-dom';

function Sendmoney() {

  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")
  const name = searchParams.get("name")

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
              />
        </div>
        
        <Button title="Initiate Transfer" onClick={() => {console.log("transfered")}}/>

    </div>
  )
}

export default Sendmoney