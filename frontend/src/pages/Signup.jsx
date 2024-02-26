import React, { useState, useEffect } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'


function Signup() {

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  })

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
  
    const verify = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/user/verifyme`, { headers: { "Authorization": `Bearer ${token}` } });
        if (response.data.user) navigate("/dashboard");
      } catch (error) {
        console.error("Verification error:", error);
      }
    };
  
    if (token) verify();
  }, []);

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
        localStorage.setItem("token", response.data.token)
        navigate("/dashboard")
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

      <Link to={"/signin"}>Already have a account ? Sign In</Link>

    </div>
  )
}

export default Signup