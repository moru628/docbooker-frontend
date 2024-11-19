import React, { useEffect, useState } from 'react'
import './relatedDoctors.css'
import { doctors } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({docId,speciality}) => {
  const [relDoc, setRelDoc] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if(doctors.length > 0 && speciality){
      const docData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
      setRelDoc(docData)
    }
  },[docId, speciality,doctors])
  return (
    <div className='top-doctor-container'>
      <h1>Related Doctors</h1>
      <p className='description'>simple browse through our extensive list of trusted doctors</p>
      <div className='top-doctor-data'>
        {relDoc.slice(0,5).map((item,index)=>(
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
      <button onClick={()=> {navigate('/doctors'); scrollTo(0, 0)}}>more</button>
    </div>
  )
}

export default RelatedDoctors