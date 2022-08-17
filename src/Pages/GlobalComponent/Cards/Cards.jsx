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
          <div className="bookmark" style={{ display:props.stats }}><button type='button'><i onClick={props.aksi} style={{ color:props.warna }} className="fas fa-bookmark" ></i></button></div>
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