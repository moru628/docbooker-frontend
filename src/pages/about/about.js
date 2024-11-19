import React from "react";
import Navbar from "../../nav/navbar";
import './about.css'
import Footer from '../../components/Footer/Footer'
import aboutImg from '../../assets/about_image.png'

const About = () => {
    return(
    <div>
      <Navbar />
      <div className="about-container">
        <p className="title">ABOUT <span>US</span></p>
        <div className="about-info">
            <img src={aboutImg} alt=""/>
            <div className="about-text">
                <p>Welcome to DocBooker, your trusted partner in managing your healthcare needs conveniently and efficiently. At DocBooker, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
                <p>DocBooker is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, DocBooker is here to support you every step of the way.</p>
                <b>Our Vision</b>
                <p>Our vision at DocBooker is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
            </div>
        </div>
        <p className="title-2">WHY <span>CHOOSE US</span></p>
        <div className="about-choose">
          <table>
            <tbody>
            <tr>
              <td>
                <div>
                  <b className="subtitle">EFFICIENCY:</b>
                  <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
                </div>
              </td>
              <td>
                <b className="subtitle">CONVENIENCE:</b>
                <p>Access to a network of trusted healthcare professionals in your area.</p>
              </td>
              <td>
                <b className="subtitle">PERSONALIZATION:</b>
                <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
    )
}

export default About