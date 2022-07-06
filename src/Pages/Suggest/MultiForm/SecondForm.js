import React, { useState } from 'react'
import { Form, Col, Row, Button, Modal } from 'react-bootstrap'
import './MultiForm.scss'

export const SecondForm = ({formData, setFormData,nextStep, prevStep}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 

  const Next = (e) => {
    e.preventDefault();
      nextStep();

  };

  const handlePopUp = (e) =>{
    e.preventDefault();
    setShow(true)
  }
  
  const [inputField, setInputField] = useState([
    {
      attention: ""
    },
    
    
  ])
  const [inputField2, setInputField2] = useState([
    {
      obligation: ""
    },
    
    
  ])
  const [inputField3, setInputField3] = useState([
    {
      prohibition: ""
    },
    
    
  ])
  console.log(formData)

const onSave = (event,index) =>{
  setFormData((prevState) => ({
    ...prevState,
    content: {
      ...prevState.content,
      rules: {
        ...prevState.content.rules,
        attention: {
          ...prevState.content.rules.attention,
          [event.target.name]: event.target.value,
        },
      },
    },
  }))

}
console.log(inputField)

const onSave2 = (event) =>{
  setFormData((prevState) => ({
    ...prevState,
    content: {
      ...prevState.content,
      rules: {
        ...prevState.content.rules,
        obligation: {
          ...prevState.content.rules.obligation,
          [event.target.name]: event.target.value,
        },
      },
    },
  }))
}

const onSave3 = (event) =>{
  setFormData((prevState) => ({
    ...prevState,
    content: {
      ...prevState.content,
      rules: {
        ...prevState.content.rules,
        prohibition: {
          ...prevState.content.rules.prohibition,
          [event.target.name]: event.target.value,
        },
      },
    },
  }))
}


  const handleAddFields = () => {
    setInputField([...inputField, { attention:'' }])
  
  }
  const handleAddFields2 = () => {
    setInputField2([...inputField2, { obligation:'' }])
  }
  const handleAddFields3 = () => {
    setInputField3([...inputField3, { prohibition:'' }])
  }

  const handleDeleteFields = (index) => {
    const values = [...inputField]
    values.splice(index,1);
    setInputField(values)
  }
  const handleDeleteFields2 = (index) => {
    const values = [...inputField2]
    values.splice(index,1);
    setInputField2(values)
  }
  const handleDeleteFields3 = (index) => {
    const values = [...inputField3]
    values.splice(index,1);
    setInputField3(values)
  }
  return (
    <Form onSubmit={handlePopUp}>
    <h4>Masukan hal yang menjadi Perhatian</h4>
    {inputField.map((inputField,index)=>(
      <div key={index+1}>
        <Form.Group className="mb-3">
                <Form.Label>Nomor :{index+1}</Form.Label>
                <Form.Control type='text' name={index+1} value={formData.content.rules.attention[index+1]} required  placeholder='Contoh : Diharap Membawa Tenda Sendiri' onChange={onSave}/>
            </Form.Group>
            
      </div>
    
    ))}
    <div className="tombol-aksi pt-2 pb-3">
    <button type='button' className='btn btn-success'  onClick={()=> handleAddFields()}>+</button>
      {inputField.length === 1 ? '' : <button type='button' className='btn btn-danger' onClick={()=> handleDeleteFields()}>-</button>}
      </div> 
    
    <br></br>

      <h4>Masukan hal yang menjadi Kewajiban</h4>
    {inputField2.map((inputField,index)=>(
      <div key={index+1}>
        <Form.Group className="mb-3">
                <Form.Label>Nomor :{index+1}</Form.Label>
                <Form.Control type='text' name={index+1}  placeholder='Contoh : Harus Memakai Pakaian Serba Putih' onChange={onSave2}/>
            </Form.Group>
            
      </div>
    
    ))} 
       <div className="tombol-aksi pt-2 pb-3">
    <button type='button' className='btn btn-success'  onClick={()=> handleAddFields2()}>+</button>
    {inputField2.length === 1 ? '' : <button type='button' className='btn btn-danger' onClick={()=> handleDeleteFields2()}>-</button>}
      </div> 
      <br />

      <h4>Masukan hal yang menjadi Larangan</h4>
    {inputField3.map((inputField,index)=>(
      <div key={index+1}>
        <Form.Group className="mb-3">
                <Form.Label>Nomor :{index+1}</Form.Label>
                <Form.Control type='text' name={index+1}  placeholder='Contoh : Jangan Memetik Buah Di Gunung Ini' onChange={onSave3}/>
            </Form.Group>
            
      </div>
    
    ))} 
     <div className="tombol-aksi pt-2 pb-3">
    <button type='button' className='btn btn-success'  onClick={()=> handleAddFields3()}>+</button>
    {inputField3.length === 1 ? '' : <button type='button' className='btn btn-danger' onClick={()=> handleDeleteFields3()}>-</button>}
      </div>
      <div className='next-prev'>
   <Button variant='warning' type='submit'>Lanjut</Button>
        </div> 

        <Modal
        size='md'
        show={show}
        onHide={handleClose}
      
      >
        <Modal.Header>
          <Modal.Title>Data Panduan Gunung Yang Anda Masukkan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-content">
            <h5>Perhatian</h5>
            {formData.content.rules.attention && Object.values(formData.content.rules.attention).map((ele,index)=>(
                            <React.Fragment key={index}>
                              <li>{ele}</li>
                            </React.Fragment>
                    ))}
            <br />
            <h5>Kewajiban</h5>
            {formData.content.rules.obligation && Object.values(formData.content.rules.obligation).map((ele,index)=>(
                            <React.Fragment key={index}>
                              <li>{ele}</li>
                            </React.Fragment>
                    ))}
            <br />
            <h5>Larangan</h5>
            {formData.content.rules.prohibition && Object.values(formData.content.rules.prohibition).map((ele,index)=>(
                            <React.Fragment key={index}>
                              <li>{ele}</li>
                            </React.Fragment>
                    ))}
            <br />
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Not Yet!
          </Button>
          <Button variant="primary" onClick={()=> nextStep()}>Sure</Button>
        </Modal.Footer>
      </Modal>
   
    </Form>
  )
}
