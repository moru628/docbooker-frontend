import React from 'react'
import './speciality.css'
import { specialityData } from '../../assets/assets'
import { Link } from 'react-router-dom'
const Speciality = () => {
  return (
    <div id='speciality' className='speciality-container'>
      <h1>Find by Speciality</h1>
      <p>Simply browse through our extensive list of trusted doctors, schedule<br />your appointment hassle-free</p>
      <div className='speciality-data'>
        {specialityData.map((item, index)=>(
          <Link key={index} to={`/doctors/${item.speciality}`} onClick={() => scroll(0, 0)}>
            <img src={item.image} alt=''/>
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Speciality