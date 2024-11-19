import React, { useEffect, useState } from 'react'
import Navbar from '../../nav/navbar'
import Footer from '../../components/Footer/Footer'
import uploadArea from '../../assets/upload_area.png'
import './myProfile.css'
import axios from 'axios'

const myProfile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [addressOne, setAddressOne] = useState('')
  const [addressTwo, setAddressTwo] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState('')
  const [image, setImage] = useState('')
  const [updateProfileImg, setUpdateProfileImg] = useState(null)
  const [imagePreview, setImagePreview] = useState(uploadArea)
  const updatedProfile = {
    name,
    image,
    phone,
    address: {
      line1: addressOne,
      line2: addressTwo,
    },
    gender,
    dob,
  }

  const url = process.env.BACKEND_URL
  const userId = localStorage.getItem('userId')
  const profileImg = localStorage.getItem('profileImg')

  const profileImgSrc =
    profileImg === '/assets/defaultProfileImg.png'
      ? profileImg
      : `${url}${profileImg}`

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${url}/profile/${userId}`)
        const profile = response.data
        setName(profile.name)
        setEmail(profile.email)
        setPhone(profile.phone)
        setAddressOne(profile.address.line1)
        setAddressTwo(profile.address.line2)
        setGender(profile.gender)
        setDob(profile.dob)
      } catch (error) {
        console.log("Failed to fetch user profile data", error)
      }
    }
    fetchProfileData()
  }, [userId])

  const updateProfileData = async () => {
    try {
      const response = await axios.put(`${url}/profile/${userId}`,updatedProfile)
      setIsEdit(false)
    } catch (error) {
      console.log("Error updating profile:", error)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUpdateProfileImg(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleImageUpdate = async () => {
    const formData = new FormData()
    formData.append('profileImg', updateProfileImg)

    try {
      const response = await axios.post(`${url}/upload/${userId}`, formData)
      localStorage.setItem('profileImg', response.data.profileImg);

      setImage(response.data.profileImg)
      setImagePreview(uploadArea)
      setUpdateProfileImg(null)
      alert("Profile image updated successfully!")
    } catch (error) {
      console.log("Error updating profile image:", error)
    }
  }

  return (
    <div>
      <Navbar />
      <div className='profile-container'>
        <div className='image-container'>
          <img src={`${profileImgSrc}`} alt='' />
          <div>
            <input
              type='file'
              accept='image/*'
              id='upload-input'
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <label htmlFor='upload-input'>
              <img src={updateProfileImg ? imagePreview : uploadArea} alt='' className='upload' />
            </label>
            {updateProfileImg && (
              <button onClick={handleImageUpdate} className='update-btn'>Update</button>
            )}
          </div>
        </div>
        {isEdit ?
          <input type='text' value={name}
            onChange={e => setName(e.target.value
            )}
            className='name-edit' />
          :
          <p className='user-name'>{name}</p>
        }
        <div className='name-line'></div>
        <div className='profile-info'>
          <div className='info-1'>
            <span>CONTACT INFORMATION</span>
            <div className='email'>
              <p>Email id:</p>
              {isEdit ?
                <p className='text'>{email}</p>
                :
                <p className='text'>{email}</p>
              }
            </div>
            <div className='phone'>
              <p>Phone:</p>
              {isEdit ?
                <input type='text' value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className='phone-edit' />
                :
                <p className='text'>{phone}</p>
              }
            </div>
            <div className='address'>
              <p>address:</p>
              <div className='address-details'>
                {isEdit ? (
                  <div>
                    <input type='text' value={addressOne}
                      onChange={e => setAddressOne(e.target.value)}
                      className='address-edit' />
                    <input type='text' value={addressTwo}
                      onChange={e => setAddressTwo(e.target.value)}
                      className='address-edit' />
                  </div>
                )  : (
                    <div>
                      <p className='text'>{addressOne}</p>
                      <p className='text'>{addressTwo}</p>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
          <div className='info-2'>
            <span>BASIC INFOMATION</span>
            <div className='gender'>
              <p>Gender:</p>
              {isEdit ?
                <select className='gender-edit' value={gender}
                  onChange={e => setGender(e.target.value)}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                </select>
                :
                <p className='text'>{gender}</p>
              }
            </div>
            <div className='dob'>
              <p>Birthday:</p>
              {isEdit ?
                <input type='date' value={dob} onChange={e => setDob(e.target.value)} className='dob-edit' />
                :
                <p className='text'>{dob}</p>
              }
            </div>
          </div>
        </div>
        <div className='profile-button'>
          {isEdit ?
            <button onClick={updateProfileData}>Save information</button>
            :
            <button onClick={() => setIsEdit(true)}>Edit</button>
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default myProfile