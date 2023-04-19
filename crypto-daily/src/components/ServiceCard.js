


import React from 'react'

function ServiceCard({img,servicves,}) {
  return (
    <div style={{width:"4rem",height:"3.5rem"}}>
    <img src={img}/>
    <strong>{servicves}</strong>
    </div>
  )
}

export default ServiceCard