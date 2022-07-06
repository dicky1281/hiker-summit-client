import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
        <div className="row">
            <div className="social col-lg-4">
                <h2 className="footer-logo">HikerSummit</h2>
                <h4 className="jargon">#Siap Membantu Petualanganmu!</h4>
                <div className="social-media">
                    <h4>Ikuti Kami di :</h4>
                    <div className="social-linked">
                        <i className="fab fa-instagram"></i>
                    </div>
                    <div className="social-linked">
                        <i className="fab fa-facebook-square"></i>
                    </div>
                    <div className="social-linked">
                        <i className="fab fa-twitter-square"></i>
                    </div>
                    <div className="social-linked">
                        <i className="fab fa-youtube"></i>
                    </div>
                    
                </div>
                <div className="email">
                <i className="fas fa-envelope"> </i> 
                <h4>halo@hikersummit.com</h4>
                </div>
                
            </div>
            <div className="about col-lg-4">
                <div className="about-detail">
                <h3>Tentang</h3>
                <ul>
                    <li>Tentang Kami</li>
                    <li>Sumber Informasi</li>
                    <li>Keselamatan Dan Kepercayaan</li>
                </ul>
                </div>
            </div>
            <div className="fitur col-lg-4">
                <div className="fitur-detail">
                <h3>Fitur</h3>
                <ul>
                    <li>Tambah Gunung</li>
                    <li>Sewa Pemandu</li>
                    <li>Menjadi Pemandu</li>
                </ul>
                </div>
            </div>

        </div>
    </footer>
  )
}

export default Footer