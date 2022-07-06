import React from 'react'
import { Accordion,Container } from 'react-bootstrap'

const Aturan = (props) => {
  return (
    <>
    <h3>Gunung {props.judul.title}</h3>
      <hr style={{ color : "black", height:"5px"
         }} />
         <div className="aturan">
            <img src="../img/Conference-pana.png" alt="" />
            <Container>
            <Accordion>
                  <Accordion.Item eventKey="0">
                     <Accordion.Header>Perhatian</Accordion.Header>
                     <Accordion.Body>
                        {props.konten?.content?.rules?.attention && Object.values(props.konten.content.rules.attention).map((ele,index)=>(
                            <React.Fragment key={index}>
                              <li>{ele}</li>
                            </React.Fragment>
                    ))}
                     </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                     <Accordion.Header>Kewajiban</Accordion.Header>
                     <Accordion.Body>
                     {props.konten?.content?.rules?.obligation && Object.values(props.konten.content.rules.obligation).map((ele,index)=>(
                            <React.Fragment key={index}>
                              <li>{ele}</li>
                            </React.Fragment>
                    ))}
                     </Accordion.Body>
                  </Accordion.Item>
                     <Accordion.Item eventKey="2">
                        <Accordion.Header>Larangan</Accordion.Header>
                        <Accordion.Body>
                        {props.konten?.content?.rules?.prohibition && Object.values(props.konten.content.rules.prohibition).map((ele,index)=>(
                            <React.Fragment key={index}>
                              <li>{ele}</li>
                            </React.Fragment>
                    ))}
                        </Accordion.Body>
                     </Accordion.Item>
                  <h4 style={{ paddingTop : "0px",paddingBottom: "20px", fontWeight: "400" }}> </h4>
               </Accordion>
         </Container>
         </div>
    </>
  )
}

export default Aturan