import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='text-black text-3xl'>
        <Link to={"/signin"}>Sign In</Link>
    </div>
  )
}

export default Home