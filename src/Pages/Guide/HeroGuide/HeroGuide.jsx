import React from 'react'
import { Container } from 'react-bootstrap'
import './HeroGuide.scss'
const HeroGuide = () => {
  return (
    <div className='explore-container'>
        
    <Container>
        <div className="explore-caption col-lg-12">
            <div className="explore-jargon col-lg-5 col-md-12">
            <h1 data-aos="fade-right" data-aos-duration="2000">TENANGKAN HATIMU HATIMU<br></br><span>SIAPKAN FISIKMU</span></h1>
            <h3 data-aos="fade-right" data-aos-duration="2000" data-aos-delay="700">Persiapan yang matang dan didampingi oleh pemandu yang berpengalaman akan membuat pendakian lebih aman.</h3>
            

            </div>
            <div className="arrow col-12">
                <button className="btn"><i className="fas fa-arrow-down"></i></button>
            </div>
    
        </div>
        
       
    </Container>
</div>
  )
}

export default HeroGuide