import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from "axios"

function Signup() {

  const [userDetails, setUserDetails] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  })

  const handleInputChange = (e, field) => {
    setUserDetails(prevState => ({
      ...prevState,
      [field]: e.target.value
    }));

  };

  const onClick = async() => {
        try {
    
        console.log(userDetails)
        const response = await axios.post("http://localhost:8000/api/v1/user/signup", userDetails)
        console.log(response.data)

        } catch (error) {
          console.log("Signup error - " , error.response)
        }
  }


  return (
    
    <div className='container'>

      <h1 className='text-[1.5rem] font-bold '>Sign Up</h1>

      <Input label="username" placeholder="kmr" onChange={(e) => handleInputChange(e, 'username')} />

      <Input label="First Name" placeholder="abc" onChange={(e) => handleInputChange(e, 'firstName')} />

      <Input label="Last Name" placeholder="cde" onChange={(e) => handleInputChange(e, 'lastName')} />

      <Input label="Password" placeholder="123" onChange={(e) => handleInputChange(e, 'password')} />

      <Button title="Submit" onClick={onClick}/>

    </div>
  )
}

export default Signup