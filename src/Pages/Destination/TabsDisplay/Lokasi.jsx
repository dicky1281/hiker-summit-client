import React from 'react'
import { Container } from 'react-bootstrap'

const Lokasi = (props) => {
  return (
    <>
    <h3>Gunung {props.judul.title}</h3>
  <hr style={{ color : "black", height:"5px"
     }} />
      <div className="lokasi">
        <Container>
            <Container>
                <div className="lokasi-wrapper">
                  {props.konten?.location?.track.map((item, index)=>(
                    <React.Fragment key={index}>
                      <div className="lokasi-domain">

                     
                    <h3>Jalur Pendakian Via {item.track_name}</h3>
                    <div className="lokasi-content">
                        <div className="lokasi-detail">
                        <h3>{item.basecamp_name}</h3>
                        <h4>Desa {item.village}, Kecamatan {item.ward}, {props.konten?.location?.province}, {item.postal_code}</h4>
                        <h4>Telp : 0{item.phone_number}</h4>
                        </div>      
                    </div>
                    </div>
                    </React.Fragment>
                  ))}
                  
                  <h4 style={{ paddingTop : "0px",paddingBottom: "20px", fontWeight: "400" }}> </h4>
            </div>
            </Container>
        </Container>
    </div>
    </>
  )
}

export default Lokasi