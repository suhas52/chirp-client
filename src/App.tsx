
import './App.css'
import { Route, Routes } from 'react-router'
import Register from './components/registerPage'
import Login from './components/loginPage'

function App() {


  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
