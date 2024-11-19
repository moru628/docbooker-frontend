import React, { useEffect, useState } from 'react'
import Navbar from '../../nav/navbar'
import Footer from '../../components/Footer/Footer'
import './myAppointment.css'
import axios from 'axios'
import Illustrator from '../../assets/illustrator.png'

const myAppointment = () => {
  const [doctors, setDoctors] = useState([])
  const [paid, setPaid] = useState({})
  const userId = localStorage.getItem('userId')
  const url = process.env.BACKEND_URL

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await axios.get(`${url}/myAppointment/${userId}`)
        setDoctors(response.data)
      } catch (error) {
        console.log('Fetch to my appointments data', error)
      }
    }
    fetchAllAppointments()
  }, [userId])

  const handleClickPay = (doctorId) => {
    setPaid(prevState => ({
      ...prevState,
      [doctorId]: true
    }))
  }

  const deleteDocAppointment = async (appointmentId) => {
    try {
      const response = await axios.delete(`${url}/myAppointment/${appointmentId}`)
      setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor._id !== appointmentId))
      alert('Deleted booking successfully')
    } catch (error) {
      console.log('Failed to delete doctor appointment', error)
    }
  }

  const handleDelete = (appointmentId) => {
    deleteDocAppointment(appointmentId)
  }

  return (
    <div>
      <Navbar />
      <div className='my-appointment-container'>
        <p className='title'>My Appointment</p>
        <div className='gap-line'></div>
        {doctors.length === 0 ? (
          <div className='illustrator'>
            <img src={Illustrator} alt='' />
            <p>Booking your first appointment!</p>
          </div>
          ) : (
            doctors.slice(0, 3).map((item) => (
              <div key={item._id}>
                <div className='my-appointment'>
                  <div className='left'>
                    <img src={item.image} alt='' />
                    <div className='my-appointment-info'>
                      <p className='name'>{item.name}</p>
                      <p className='speciality'>{item.speciality}</p>
                      <span>Address:</span>
                      <p className='line-1'>{item.address.line1}</p>
                      <p className='line-2'>{item.address.line2}</p>
                      <div className='date'>
                        <span>Date & Time:</span>
                        <p className='time'>{item.date} | {item.time}</p>
                      </div>
                    </div>
                  </div>
                  <div className='my-appointment-button'>
                    <button className='pay' onClick={() => handleClickPay(item._id)}>{paid[item._id] ? 'Paid' : 'Pay here'}</button><br />
                    <button className='cancel' onClick={() => handleDelete(item._id)}>Cancel appoointment</button>
                  </div>
                </div>
                <div className='gap-line'></div>
              </div>
            ))
          )
        }
      </div>
      <Footer />
    </div>
  )
}

export default myAppointment