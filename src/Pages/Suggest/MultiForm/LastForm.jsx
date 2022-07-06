import React, { useState } from 'react'
import { Form } from 'react-bootstrap'


export const LastForm = ({image, setImage}) => {

    // const[selectedImage, setSelectedImage] = useState([])

    // const imageHandle = (e) =>{

    //     if (e.target.files){
    //         const fileArray = Array.from(e.target.files).map((file)=> URL.createObjectURL(file))
    //         console.log(fileArray)

    //         setSelectedImage((prevImages)=>prevImages.concat(fileArray))
    //         Array.from(e.target.files).map(
    //             (file)=>URL.revokeObjectURL(file)
    //         )
    //     }
    // }
    // const renderPhotos = (source) =>{
    //     return source.map((photo)=>{
    //         return <img src={photo} key={photo}/>
    //     })
    // }

  return (
    <>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Masukkan Gambar 1</Form.Label>
          
                <Form.Control multiple type="file" onChange={(event)=> setImage(event.target.files)}/>
            </Form.Group>
            {/* <div className="preview">
                {renderPhotos(selectedImage)}
            </div> */}
     

           
    </>
  )
}
// setImage((prev)=>[...prev,event.target.files[0]])
