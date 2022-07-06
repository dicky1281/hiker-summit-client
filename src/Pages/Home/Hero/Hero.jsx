import React from 'react'
import { Container,Col, Button } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import './Hero.scss'

const Hero = () => {

    const navigate = useNavigate();
  return (
    <section className='hero-container'>
        
        <Container>
            <div className="caption">
                <Col lg={5}>
            <h1 data-aos="fade-right" data-aos-duration="2000">MULAILAH<br></br><span>BERKELANA</span></h1>
                <h3 data-aos="fade-right" data-aos-duration="2000" data-aos-delay="700">Kemasi barang-barangmu, temukan petualanganmu dan nikmati sensasi kedekatan dengan alam disekitarmu.</h3>
                <div className="hero-btn" data-aos="zoom-in" data-aos-delay="1100" data-aos-duration="1000">
                    <NavLink to="/explore"><Button variant='warning'>Explore</Button></NavLink>
                </div>
                </Col>
            </div>
        
        </Container>
    </section>
  )
}

export default Hero