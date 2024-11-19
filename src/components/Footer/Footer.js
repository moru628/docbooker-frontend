import React from 'react'
import './footer.css'
import logo from '../../assets/logo_nav.png'
const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer'>
        <div className='footer-left'>
          <img src={logo} alt=''/>
          <p>Our doctor appointment booking platform makes healthcare access easy and convenient. With a vast network of certified professionals across a range of specialties, we are here to help you connect with the right doctor, at the right time.</p>
        </div>
        <div className='footer-center'>
          <p className='center-title'>COMPANY</p>
          <div className='list'>
            <p>Home</p>
            <p>About us</p>
            <p>Contact us</p>
            <p>Privacy policy</p>
          </div>
        </div>
        <div className='footer-right'>
          <p className='right-title'>GET IN TOUCH</p>
          <div className='list'>
            <p>123-456-789</p>
            <p>docbooker@gmail.com</p>
          </div>
        </div>
      </div>
      <div className='copyright'>
        <div className='footer-line'></div>
        <p>Copyright © 2024 DocBooker - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer