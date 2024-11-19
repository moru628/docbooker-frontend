import React, { useState } from 'react'
import Navbar from '../../nav/navbar'
import './login.css'
import Footer from '../../components/Footer/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../store/modules/authStore'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [state, setState] = useState('Sign up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [note, setNote] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const url = process.env.BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${url}/register`, { name, email, password })
      if(response.data.message === 'exist'){
        setNote('The user has already existed')
      } else {
        alert('Account created successfully')
        setState('')
      }
    } catch (error) {
      console.log("failed to register", error)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${url}/login`, { email, password })
      if (response.data.message === 'success') {
        const userId = response.data.userId
        const profileImg = response.data.profileImg
        dispatch(login({userId, profileImg}));
        navigate('/')
        alert("Log in successfully")
      } else {
        setNote(response.data)
      }
    } catch (error) {
      console.log("failed to login", error)
    }
  }

  return (
    <div>
      <Navbar />
      <div className='login-container'>
        <div className='login-card'>
          <p className='title'>{state === 'Sign up' ? 'Create Account' : 'Login'}</p>
          <p className='subtitle'>Please {state === 'Sign up' ? 'Sign up' : 'login'} to book appointment</p>
          <form className='login-form' onSubmit={state === 'Sign up' ? handleSubmit : handleLogin}>
            {state === 'Sign up' ?
              <div>
                <p>Full Name</p>
                <input type='text' onChange={(e) => setName(e.target.value)} value={name} />
              </div>
              :
              <div></div>
            }
            <div>
              <p>Email</p>
              <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className='password-wrap'>
              <p>Password</p>
              <input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} value={password} />
              <span
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit">
              {state === 'Sign up' ? 'Create account' : 'Login'}
            </button>
          </form>

          {state === 'Sign up' ?
            <p className='bottom'>Already have an account? <span onClick={() => setState('Login')}>Login here</span></p>
            :
            <p className='bottom'>Create an new account?<span onClick={() => setState('Sign up')}>Click here</span></p>
          }
          {note === '' ? <div></div> : <div className='notification'>{note}</div>}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login