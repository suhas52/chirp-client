
import './App.css'
import { Route, Routes } from 'react-router'
import Register from './components/registerPage'
import Login from './components/loginPage'
import Homepage from './components/home-page/home'
import IndividualPost from './components/home-page/post/individualPost'
import Profile from './components/profile/profile'

function App() {


  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/post/:postId' element={<IndividualPost />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
