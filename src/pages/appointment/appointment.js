import React, { useEffect, useState } from 'react'
import Navbar from "../../nav/navbar";
import { useParams } from 'react-router-dom';
import Footer from "../../components/Footer/Footer";
import { doctors } from '../../assets/assets';
import infoIcon from '../../assets/info_icon.svg'
import vectorIcon from '../../assets/vector.png'
import './appointment.css'
import RelatedDoctors from '../../components/RelatedDoctors/RelatedDoctors';
import axios from 'axios';

const Appointment = () => {
  const {docId} = useParams()
  const [docInfo, setDocInfo] = useState(null)
  const daysOffWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const userId = localStorage.getItem('userId')
  const url = process.env.BACKEND_URL;

  const fetchDocInfo = async() => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  useEffect(()=>{
    fetchDocInfo()
  },[docId,docInfo])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  useEffect(()=>{
    console.log(docSlots)
  },[docSlots])

  const getAvailableSlots = async() => {
    setDocSlots([])

    let today = new Date()

    for(let i = 0; i < 7; i++){
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(22,0,0,0)

      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes()>30 ? 30 : 0)
      }else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while(currentDate < endTime){
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const handleBooking = async() => {
    if(!slotTime || docSlots.length === 0){
      alert('Please select a booking data and a time')
      return
    }
    const bookingDate = docSlots[slotIndex][0]?.datetime.toISOString().split('T')[0];

    try{
      await axios.post(`${url}/myAppointment/${userId}`,{
        userId,
        name: docInfo.name,
        image: docInfo.image,
        speciality: docInfo.speciality,
        address: {
          line1: docInfo.address.line1,
          line2: docInfo.address.line2
        },
        date: bookingDate,
        time: slotTime
      })
      alert('Appointment booked successfully!')
    }catch(error){
      console.error('Error booking appointment:', error);
    }
  }

  if (!docInfo) {
    return <div>Loading...</div>
  }
  
  return (
    <div>
      <Navbar />
        <div className='appointment-container'>
          <div className='appointment-image'>
            <img src={docInfo.image} alt='' />
          </div>
          <div>
            <div className='appointment-doctor'>
              <div className='info-name'>
                <p>{docInfo.name}</p>
                <img src={vectorIcon} alt=''/>
              </div>
              <div className='info-degree'>
                <p>{docInfo.degree}</p><p>-</p><p>{docInfo.speciality}</p><p className='experience'>{docInfo.experience}</p>
              </div>
              <div className='info-about'>
                <p>About</p>
                <img src={infoIcon} alt=''/>
              </div>
              <p className='about-content'>{docInfo.about}</p>
              <p className='appointment-fee'>Appointment fee: <span>${docInfo.fees}</span></p>
            </div>

            <div className='booking-container'>
              <p className='title'>Booking slots</p>
              <div className='booking-date'>
                {
                  docSlots.length > 0 && docSlots.map((item,index)=>(
                    <div key={index} className={`date ${slotIndex === index ? 'active' : ''}`} onClick={()=>setSlotIndex(index)}>
                      <p>{item[0] && daysOffWeek[item[0].datetime.getDay()]}</p>
                      <p className='number'>{item[0] && item[0].datetime.getDate()}</p>
                    </div>
                  ))
                }
              </div>
              <div className='booking-time'>
                {docSlots.length && docSlots[slotIndex].map((item,index)=>(
                  <p key={index} className={`${item.time === slotTime ? 'active' : ''}`} onClick={()=>setSlotTime(item.time)}>
                    {item.time.toLowerCase()}
                  </p>
                ))}
              </div>
              <button onClick={handleBooking}>Book an appointment</button>
            </div>
          </div>
        </div>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
      <Footer />
    </div>
  )
}

export default Appointment