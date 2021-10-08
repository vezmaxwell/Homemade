import React from 'react'
import 'dotenv/config'
import axios from 'axios'

const ImageUpload = ({ value, name, handleImageUrl }) => {

  const handleChange = async (e) => {
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    formData.append('upload_preset', 'wo9bqtet')
    const { data } = await axios.post('https://api.cloudinary.com/v1_1/dqqidr9eg/image/upload', formData)
    handleImageUrl(data.url)
  }

  return (
    <>
      <label htmlFor="image">Upload Image</label>
      <input type="file" name={name} id="image" className="input" onChange={handleChange}/>
    </>
  )

}

export default ImageUpload