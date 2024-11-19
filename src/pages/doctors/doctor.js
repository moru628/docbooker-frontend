import React, { useEffect, useState } from 'react'
import Navbar from '../../nav/navbar'
import Footer from '../../components/Footer/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import './doctor.css'
import {doctors} from '../../assets/assets'

const Doctors = () => {
  const {speciality} = useParams()
  const [filteredDoc, setFilteredDoc] = useState([])
  const navigate = useNavigate()

  const applyfilter = () => {
    if(speciality){
      setFilteredDoc(doctors.filter(doc => doc.speciality === speciality))
    }else{
      setFilteredDoc(doctors)
    }
  }

  useEffect(()=>{
    applyfilter()
  }, [doctors, speciality])

  return (
    <div>
      <Navbar />
      <p className='doctor-title'>Browse through the doctors specialist</p>
      <div className='doctor-container'>
        <div className='doctor-speciality'>
          <p onClick={()=> speciality === 'General physician' ? navigate('/doctors'): navigate('/doctors/General physician')} className={speciality === 'General physician' ? 'active': ''}>General physician</p>
          <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors'): navigate('/doctors/Gynecologist')} className={speciality === 'Gynecologist' ? 'active': ''}>Gynecologist</p>
          <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors'): navigate('/doctors/Dermatologist')} className={speciality === 'Dermatologist' ? 'active': ''}>Dermatologist</p>
          <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors'): navigate('/doctors/Pediatricians')} className={speciality === 'Pediatricians' ? 'active': ''}>Pediatricians</p>
          <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors'): navigate('/doctors/Neurologist')} className={speciality === 'Neurologist' ? 'active': ''}>Neurologist</p>
          <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors'): navigate('/doctors/Gastroenterologist')} className={speciality === 'Gastroenterologist' ? 'active': ''}>Gastroenterologist</p>
        </div>
        <div className='doctor-data'>
          {filteredDoc.map((item, index)=>(
            <div key={index} className='card' onClick={()=>navigate(`/appointment/${item._id}`)}>
              <img src={item.image} alt='' className=''/>
              <div className='doctor-info'>
                <div className='first'>
                  <p className='dot'></p><p className='status'>Avaliable</p>
                </div>
                <p className='name'>{item.name}</p>
                <p className='speciality'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Doctors