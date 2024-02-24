import React from 'react'
import Button from '../components/Button';
import {useNavigate} from "react-router-dom"


function User({user}) {

    const navigate = useNavigate();

  return (
    <div className='w-[100%] flex justify-between items-center mt-2'>

                <div className='flex items-center justify-center gap-[0.5rem]'>

                    <div className="rounded-full h-12 w-12 bg-blue-200 flex justify-center">
                        <div className="flex flex-col justify-center h-full text-xl">
                            {user.firstName[0]}
                        </div>
                    </div>

                    <div>
                      {user.firstName} {user.lastName}
                    </div>

                </div>

                <div className='w-[8rem]'>
                <Button title="Send Money" onClick={()=>{
                  navigate("/sendmoney?id=" + user._id + "&name=" + user.firstName)
                }} />
                </div>
                
            </div>
  )
}

export default User