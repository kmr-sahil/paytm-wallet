import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import Dashboard from "./components/Dashboard"
import SendMoney from './components/Sendmoney'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/sendmoney" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
