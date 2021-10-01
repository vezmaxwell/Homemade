import React from 'react'
import 'dotenv/config'
import axios from 'axios'

const ImageUpload = ({ value, name, handleImageURL }) => {

  const url = process.env.REACT_APP_CLOUDINARY_URL
  const preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

  const handleChange = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    formData.append('upload_preset', preset)
    const { data } = await axios.post(url, data)
    handleImageURL(data.url)
  }

  return (
    <>
        <p htmlFor={name}>Upload Image</p>
        <input type="file" name={name} className="input" onChange={handleChange}/>
    </>
  )
}

export default ImageUpload