import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import SendMoney from './pages/Sendmoney'

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
