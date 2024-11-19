import React from 'react'
import './header.css'
import groupImg from '../../assets/group.png'
import doctorImg from '../../assets/doctor_group.png'

const Header = () => {
  return (
    <div className='container'>
      <div className='header-left'>
        <p className='title'>Book Appointment <br />With Trusted Doctors</p>
        <div className='group'>
          <img src={groupImg} alt=''/>
          <p>Simple browse through our extensive list of trusted doctors,<br />schedule your appointment hassle-free</p>
        </div>
        <a href='/doctors'>
          Book appointment
        </a>
      </div>
      <div className='header-right'>
        <img src={doctorImg} alt='' className='doctor_group'/>
      </div>
    </div>
  )
}

export default Header