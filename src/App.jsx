import {useState} from 'react'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './custom.css'
import Login from './Pages/Login'
import Registro from './Pages/Registro'
import MainConversa from './Pages/MainConversa'
import UserProfile from './Pages/UserProfile'

const App =()=>{

  
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registro' element={<Registro/>}/>
        <Route path='/conversa' element={<MainConversa/>}/>
        <Route path='/usuario' element={<UserProfile/>}/>
      </Routes>
    </Router>
  )
}

export default App