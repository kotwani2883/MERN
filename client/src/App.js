import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Signup from './components/Signup'
import Contact from './components/Contact'
import {Route} from 'react-router-dom'

const App=()=>{
  return(
    <div>
      <Navbar/>

      <Route exact path="/">
      <Home />
      </Route>

      <Route path="/contact">
      <Contact />
      </Route>

      <Route path="/signup">
      <Signup />
      </Route>

      <Route path="/login">
      <Login />
      </Route>

      <Route path="/about">
      <About />
      </Route>
     
    </div>
  )
}

export default App