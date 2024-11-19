import React from 'react'
import Navbar from '../../nav/navbar'
import Footer from '../../components/Footer/Footer'
import './contact.css'
import contactImg from '../../assets/contact_image.png'

const Contact = () => {
  return (
    <div>
      <Navbar />
        <div className='contact-container'>
        <p className='title'>CONTACT <span>US</span></p>
        <div className='contact-info'>
          <img src={contactImg} alt=''/>
          <div className='text'>
            <b>OUR OFFICE</b>
            <p>54709 Willms Station<br />Suite 350, Washington, USA</p>
            
            <p>Tel: 123-456-789 <br />docbooker@gmail.com</p>

            <b>CAREERS AT DOCBOOKER</b>
            <p>Learn more about our teams and job openings.</p>

            <button>Explore Jobs</button>
          </div>
        </div>
        </div>
      <Footer />
    </div>
  )
}

export default Contact