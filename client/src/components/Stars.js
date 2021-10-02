import React from "react"

const Stars = ({ rating }) => {
  const stars = ['⭐️', '⭐️', '⭐️', '⭐️', '⭐️'].map((star, index) => {
    if (index < Number(rating)) {
      return <span>{star}</span>
    } else {
      return <span className="grey">{star}</span>
    }
  })
  return (
    <div className="stars">{stars}</div>
  )


}
export default Stars