import { useState } from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import './App.css'
import { Signup } from './routes/Signup'
import { Signin } from './routes/Signin'
import { Dashboard } from './routes/Dashboard'
import { Send } from './routes/Send'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>} ></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/send" element={<Send/>} ></Route>

    </Routes>

    </BrowserRouter>
  )
}

export default App
