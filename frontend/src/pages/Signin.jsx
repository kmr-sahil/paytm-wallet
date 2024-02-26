import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'

function Signin() {

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    username: "",
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
    const response = await axios.post("http://localhost:8000/api/v1/user/signin", userDetails)
    localStorage.setItem("token", response.data.token)
    navigate("/dashboard")

    console.log(response.data)

    } catch (error) {
      console.log("Signup error - " , error.response)
    }
}

  return (
    <div className='container'>

      <h1 className='text-[1.5rem] font-bold '>Sign In</h1>

      <Input label="username" placeholder="kmr" onChange={(e) => handleInputChange(e, 'username')} />

      <Input label="Password" placeholder="123" onChange={(e) => handleInputChange(e, 'password')} />

      <Button title="Submit" onClick={onClick}/>

      <Link to="/signup">Don't have a account ? Sign Up</Link>


    </div>
  )
}

export default Signin