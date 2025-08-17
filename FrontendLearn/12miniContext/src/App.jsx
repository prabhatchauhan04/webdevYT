import { useState } from 'react'
import './App.css'
import UserContextProvider from './context/UserContextProvider'
import Login from './components/Login'
import Profile from './components/Profile'

function App() {

  return (
    // ab isske andar jo bhi tags honge unhe miljaega props ka access
    <UserContextProvider>
      <h1>Hello !</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  )
};

export default App;
