
import './App.css'
import { Route, Routes } from 'react-router'
import Register from './components/sign-up/registerPage'
import Login from './components/login-in/loginPage'
import Homepage from './components/home-page/home'
import IndividualPost from './components/home-page/post/individualPost'
import Profile from './components/profile/profile'
import LandingPage from './components/landing-page'
import Navbar from './components/navbar/navbar'

function App() {

  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <Navbar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/post/:postId' element={<IndividualPost />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </>

  )
}

export default App
