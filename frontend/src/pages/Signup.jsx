import React, { useState, useEffect } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'


function Signup() {

  const navigate = useNavigate();

  const [load, setLoad] = useState(false)
  const [error, setError] = useState("")
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

  const onClick = async () => {
    try {
      setLoad(true);
      const response = await axios.post("http://localhost:8000/api/v1/user/signup", userDetails);
      const token = response?.data?.token; // Access token safely
      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        setError("Token not received or invalid response"); // Handle case where token is not received
        setTimeout(() => setError(""), 2000); // Clear error after 2 seconds
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      console.log("Signup error - ", error.response);
      setTimeout(() => setError(""), 2000);
    } finally {
      setLoad(false);
    }
  };


  return (
    
    <div className='container'>

      {load && (
        <div role="status" className='absolute bg-blue-50 p-[1rem] rounded-md border border-blue-200'>
          <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-400 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
        </div>
      )}

      {error && <span className='w-[15rem] text-center absolute bg-blue-50 p-[1rem] rounded-md border border-blue-200'>{error}</span>}

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