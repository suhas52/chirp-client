
import './App.css'
import { Route, Routes } from 'react-router'
import Register from './components/registerPage'
import Login from './components/loginPage'
import Homepage from './components/home-page/home'

function App() {


  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Homepage />} />
      </Routes>
    </>
  )
}

export default App
