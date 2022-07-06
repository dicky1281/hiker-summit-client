import React from 'react'
import { Container } from 'react-bootstrap'
import './HeroExplore.scss'

const HeroExplore = (props) => {
  return (
    <div className="guide-container">
    <Container>
            <div className="caption col-12">
                <div className="caption-text col-lg-6 col-md-12">
                    <h1 data-aos="fade-right" data-aos-duration="2000">JELAJAHI INDAHNYA<br></br><span>GUNUNG INDONESIA</span></h1>
                    <h3 data-aos="fade-right" data-aos-duration="2000" data-aos-delay="700">Sempatkanlah dirimu untuk melihat betapa luar biasa indahnya mahakarya Sang Pencipta.</h3>
                    <div className="search-input col-lg-9" data-aos="fade-right" data-aos-duration="2000" data-aos-delay="700">
                    <input type="text" onClick={props.click} disabled={props.stats} name="search" placeholder="Mau Ke Gunung Apa ?" value={props.value} onChange={props.searchBind}/>
                    </div>
                </div>
            <div className="arrow col-12">
                <button className="btn"><i className="fas fa-arrow-down"></i></button>
            </div>
            </div>
    </Container>
    
   
</div>
  )
}

export default HeroExplore