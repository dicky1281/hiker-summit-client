import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Cards.scss'

const Cards = (props) => {

    const kesulitan = props.kesulitan
    
  return (
    <>
    <Card style={{ borderRadius: '15px', position:"relative" }}>
          <div className='inner'>
          <Link to={props.going} style={{  textDecoration:"none" }}><Card.Img variant="top" src={props.imgs} /></Link>
          </div>
        
       
         
          <Card.Body>
          <div className="bookmark"><button type='button' onClick={props.aksi}><i className="fas fa-bookmark" ></i></button></div>
          {/* <div className="bookmark"><i className="fas fa-bookmark" onClick={props.aksi}></i></div> */}
           {/* <div className="category" style={kesulitan === "ahli" ? {backgroundColor:"red"}:kesulitan === "menengah" ? {backgroundColor:"orange"}:{backgroundColor:"greenyellow"}}><h4>{props.kesulitan}</h4></div> */}
           <Button variant={kesulitan === "ahli" ? "danger" : kesulitan === "menengah" ? "warning" : "success"}>{props.kesulitan}</Button>
            <Link to={props.going} style={{  textDecoration:"none" }}><Card.Title  style={{  textTransform:"capitalize" }}>Gunung {props.mouname}</Card.Title></Link>
            
            <div className="card-action">
            <Card.Text>   
            <i className="fas fa-map-marker-alt" style={{  color : "#FF1C1C", textTransform:"uppercase" }}><span> {props.lokasi}</span></i>
           
              </Card.Text>
              </div>
                  </Card.Body>
        </Card>

    </>
  )
}

export default Cards