import React from 'react'
import './Tabs.scss'

const InformasiUmum = (props) => {
 
  return (
      <>
      <h3 className="title">Gunung {props.title}</h3>
      <hr style={{ color : "black", height:"5px"
         }} />
      <div className="square">
          <img src={props.gambar} alt="" />
          <p>{props.general_information}</p>
      </div>

      <h4 className='p-3'>Informasi Kurang Akurat? <b onClick={props.clicks} style={{ cursor:'pointer' }}>Masukan Informasi</b></h4>
      </>
    
  )
}

export default InformasiUmum