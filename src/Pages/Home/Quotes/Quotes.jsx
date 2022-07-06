import React from 'react'
import { Container } from 'react-bootstrap'
import './Quotes.scss'

const Quotes = () => {
  return (
    <section className="quotes">
      <Container>
        <h1 className='title text-center' data-aos="zoom-in">Kutipan</h1>
        <div className="quotes-creator">
          <div className="quotes-author">
            <img src="img/quotes-image.png" alt="" data-aos="zoom-in"/>
            <h2 data-aos="fade-up" data-aos-delay="400">“Dunia itu seluas langkah kaki. Jelajahilah dan jangan pernah takut melangkah. Hanya dengan itu kita bisa mengerti kehidupan dan menyatu dengannya.”<br></br> <span><b>- Soe Hok Gie</b></span></h2>
          </div>
          <div className="quotes-author2">
            <img src="img/quotes-image2.png" alt="" data-aos="zoom-in" />
            <h2 data-aos="fade-up" data-aos-delay="400">“Ternyata, makin tinggi kaki kita berpijak, makin kita menyadari betapa kecilnya diri kita. Gunung tercipta bukan agar kita bisa menaklukkan puncaknya. Gunung tercipta agar kita mampu menaklukkan ego kita sendiri.”<br></br> <span><b>-  Fiersa Besari</b></span></h2>
          </div>
        </div>
      </Container>
      
    </section>
  )
}

export default Quotes