import React from 'react'
import { doctors } from '../../assets/assets'
import './topDoctors.css'
import { useNavigate } from 'react-router-dom'
const TopDoctors = () => {
  const navigate = useNavigate()

  return (
    <div className='top-doctor-container'>
      <h1>Top Doctors to Back</h1>
      <p className='description'>simple browse through our extensive list of trusted doctors</p>
      <div className='top-doctor-data'>
        {doctors.slice(0,10).map((item,index)=>(
          <div key={index} className='card' onClick={()=> {navigate(`/appointment/${item._id}`); scrollTo(0,0)}}>
            <img src={item.image} alt=''/>
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
      <button onClick={()=> {navigate('/doctors'); window.scrollTo(0, 0)}}>more</button>
    </div>
  )
}

export default TopDoctors