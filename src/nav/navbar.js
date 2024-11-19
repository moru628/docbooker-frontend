import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './navbar.css'
import image from '../assets/logo_nav.png'
import icon from '../assets/dropdown_icon.svg'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/modules/authStore";

const Navbar = () => {
  const navigate = useNavigate()
  const [isClick, setIsClick] = useState(false)

  const dispatch = useDispatch()
  const token = useSelector((state)=>state.auth.token)

  const handleLogout = () => {
    dispatch(logout())
    setIsClick(false)
    navigate('/')
  }
  const url = process.env.BACKEND_URL
  const profileImg = localStorage.getItem('profileImg')

  const profileImgSrc = 
  profileImg === '/assets/defaultProfileImg.png'
    ? profileImg
    : `${url}${profileImg}`

  return(
    <nav>
      <img src={image} alt='' className="logo" onClick={()=>navigate('/')}/>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            HOME
          </NavLink>
          <div className="line"></div>
        </li>
        <li>
          <NavLink
            to="/doctors"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            DOCTOR
          </NavLink>
          <div className="line"></div>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            ABOUT
          </NavLink>
          <div className="line"></div>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            CONTACT
          </NavLink>
          <div className="line"></div>
        </li>

      </ul>
      <div>
        {!token ? 
          <button className="btn" onClick={()=>navigate('/login')}>Create account</button>
        :
        <div className="nav-right">
          <div className="nav-login" onClick={()=>setIsClick(!isClick)}>
            <img 
                src={profileImgSrc} 
                alt="Profile" 
                className="profile-image" 
              />
            <img src={icon} alt="" className="icon"/>
          </div>
          {isClick && (
            <div className="dropdown">
              <p onClick={()=>navigate('/myProfile')}>My Profile</p>
              <p onClick={() => navigate('/myAppointment')}>My Appointments</p>
              <p onClick={()=>handleLogout()}>Logout</p>
            </div>
          )}
        </div>
        }
      </div>
    </nav>
  )
}

export default Navbar