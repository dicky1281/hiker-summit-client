import React from 'react'
import { Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Jombotron.scss'

const Jombotron = () => {

  const navigate = useNavigate();

  return (
    <section className="Jombotron">
        <img src="img/Jombotron.png" alt="" />
        <div className="Jombotron-desc">
            <Col lg={{ span:5, offset: 1 }} md={12}>
            <h2 data-aos="fade-up" data-aos-anchor-placement="center-bottom" data-aos-duration="1500">SEGERA<br></br><span>PERSIAPAN</span></h2>
            <h4 data-aos="fade-up"data-aos-anchor-placement="center-bottom" data-aos-duration="1500" data-aos-delay="500">Kabari sobatmu, tentukan tujuannya, pelajari dengan matang dan selamat berpetualang!</h4>
            <button onClick={()=>navigate('/explore')} className='btn' data-aos="fade-up"data-aos-anchor-placement="center-bottom" data-aos-delay="1200">EXPLORE</button>
            </Col>
        </div>
    </section>
  )
}

export default Jombotron