import React from 'react'
import './banner.css'
import image from '../../assets/banner-doctor.png'

const Banner = () => {
  return (
    <div className='banner-container'>
      <div className='left'>
        <p>Book Appointment<br />With 100+ Trusted Doctors</p>
        <a href='/login'>Create account</a>
      </div>
      <div className='right'>
        <img src={image} alt=''/>
      </div>
    </div>
  )
}

export default Banner