import React from 'react'
import { Col, Container } from 'react-bootstrap'
import './HeroSuggest.scss'

const HeroSuggest = () => {
  return (
    <div className='suggest-container'>
        <Container>
            <div className="suggest-caption">
                <Col lg={5} md={12}>
                    <div className="suggest-quotes">
                        <h1 data-aos="fade-right" data-aos-duration="2000">TAMBAHKAN GUNUNG<br></br><span>KE HIKER SUMMIT</span></h1>
                        <h3 data-aos="fade-right" data-aos-duration="2000" data-aos-delay="700">Terima kasih telah memberi tahu kami tentang gunung baru untuk dicantumkan di HikerSummit. Kontribusi Anda membuat komunitas pendaki kami menjadi semakin kuat. <br></br> <br /> Salam Lestari!</h3>
                    </div>
                </Col>
            </div>
        </Container>
    </div>
  )
}

export default HeroSuggest