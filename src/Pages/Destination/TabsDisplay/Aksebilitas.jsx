import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Aksebilitas = (props) => {
  return (
    <>
     <h3 >Gunung {props.judul.title}</h3>
  <hr style={{ color : "black", height:"5px"
     }} />
     <div className="aksebilitas">
        <div className="aksebilitas-content">
            <Container>
             
        
      
        <div className="aksebilitas-info">
        <Row>
          <Col lg={6} md={12}>
            <div className="aksebilitas-road">
                <br />
                <h2 className='mb-2' style={{ textTransform:"capitalize" }}>Aksesibilitas Menuju Gunung {props.judul.title}</h2>
                {props.konten?.location?.track.map((item, index)=>(
                    <React.Fragment key={index}>
                      <h4 className='pt-2' style={{ textTransform:"capitalize" }}>Jalur {item.track_name}</h4>
                      
                    {item?.accessibility && Object.values(item.accessibility).map((ele)=>(
                      <>
                  
                      <li>{ele}</li>
                      </>
                    ))}
                    </React.Fragment>
                  ))}

            </div>
            </Col>
            <Col lg={6} md={12}>
            <img src="../img/character.png" alt="" />
            </Col>
            </Row>
        </div>
      
      
        </Container>
        </div>

    </div>
    </>
  )
}

export default Aksebilitas