import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { SuggestHandler } from "../../../apiCalls/apiCalls";
import {useSelector, useDispatch }from 'react-redux'
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";

export const ThirdForm = ({ formData, setFormData, image, prevStep }) => {

  const user = useSelector((state) => state.user.user);
  const privateInstance = useAxiosPrivate();
  const dispatch = useDispatch();

  const Next = async(e) => {
    e.preventDefault()
   
   try {
    const data = new FormData();
    data.append("document",JSON.stringify(formData))
    Object.values(image).forEach(element => {
        data.append("image",element)

    });
    await privateInstance.post(`/api/v1/destinations/${user._id}`, data)
    window.location.reload(false);
  
   } catch (error) {
    alert(error)
   }
   
  };
  const Prev = (e) => {
    prevStep();
  };

  const [inputField, setInputField] = useState([
    {
      description: "",
      basecamp_name: "",
      district: "",
      postal_code: "",
      road_name: "",
      track_name: "",
      village: "",
      ward: "",
      phone_number: "",
      accessibility: { 1: "", 2: "", 3: "" },
    },
  ]);

  const [combine, setCombine] = useState({});
  console.log(combine)
  console.log(formData)

  const handleSubmit = () => {
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, track: Object.values(combine) },
    }));
  };

  const handleAddFields = (index) => {
    setInputField([
      ...inputField,
      {
        description: "",
        basecamp_name: "",
        district: "",
        postal_code: null,
        road_name: "",
        track_name: "",
        village: "",
        ward: "",
        phone_number: "",
        accessibility: { 1: "", 2: "", 3: "" },
      },
    ]);
  };

  const handleDeleteFields = (index) => {
    const values = [...inputField];
    values.splice(index, 1);
    setInputField(values);
  };

  useEffect(() => {
    handleSubmit();
  }, [combine]);

  return (
    <>
    <Form onSubmit={Next}>
      <h3>Masukan Track Yang Anda Ketahui</h3>
      <br />
      {inputField.map((inputField, index) => (
        <React.Fragment key={index}>
          <h4>Jalur Ke {index + 1}</h4>
          <Form.Group className="mb-3">
            <Form.Label>Nama Track</Form.Label>
            <Form.Control
              id={`${index}`}

              type="text"
              name="track_name"
              required
              onChange={(e) =>
                setCombine((prev) => ({
                  ...prev,
                  [e.target.id]: {
                    ...prev[Object.keys(e.target.id)],
                    [e.target.name]: e.target.value,
                  },
                }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nama BaseCamp</Form.Label>
            <Form.Control
              id={`${index}`}
              type="text"
              name="basecamp_name"
     
              required
              onChange={(e) =>
                setCombine((prev) => ({
                  ...prev,
                  [e.target.id]: {
                    ...prev[Object.keys(e.target.id)],
                    [e.target.name]: e.target.value,
                  },
                }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Deskripsi Jalur</Form.Label>
            <Form.Control
              id={`${index}`}
              as="textarea"
              rows={3}
              required
              name="description"
      
              onChange={(e) =>
                setCombine((prev) => ({
                  ...prev,
                  [e.target.id]: {
                    ...prev[Object.keys(e.target.id)],
                    [e.target.name]: e.target.value,
                  },
                }))
              }
            />
          </Form.Group>

          <Row>
            <Form.Group as={Col} md="4" className="mb-3">
              <Form.Label>Nama Daerah</Form.Label>
              <Form.Control
                id={`${index}`}
                type="text"
                required
                name="district"
         
                onChange={(e) =>
                  setCombine((prev) => ({
                    ...prev,
                    [e.target.id]: {
                      ...prev[Object.keys(e.target.id)],
                      [e.target.name]: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" className="mb-3">
              <Form.Label>Nama Jalan</Form.Label>
              <Form.Control
                id={`${index}`}
                type="text"
                required
                name="road_name"
          
                onChange={(e) =>
                  setCombine((prev) => ({
                    ...prev,
                    [e.target.id]: {
                      ...prev[Object.keys(e.target.id)],
                      [e.target.name]: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" className="mb-3">
              <Form.Label>Nama Desa</Form.Label>
              <Form.Control
                id={`${index}`}
                type="text"
                name="village"
                required
      
                onChange={(e) =>
                  setCombine((prev) => ({
                    ...prev,
                    [e.target.id]: {
                      ...prev[Object.keys(e.target.id)],
                      [e.target.name]: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4" className="mb-3">
              <Form.Label>Nama Kelurahan</Form.Label>
              <Form.Control
                id={`${index}`}
                type="text"
                required
                name="ward"
       
                onChange={(e) =>
                  setCombine((prev) => ({
                    ...prev,
                    [e.target.id]: {
                      ...prev[Object.keys(e.target.id)],
                      [e.target.name]: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" className="mb-3">
              <Form.Label>Kode Pos</Form.Label>
              <Form.Control
                id={`${index}`}
                type="number"
                required
                name="postal_code"
      
                onChange={(e) =>
                  setCombine((prev) => ({
                    ...prev,
                    [e.target.id]: {
                      ...prev[Object.keys(e.target.id)],
                      [e.target.name]: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="4" className="mb-3">
              <Form.Label>Nomor Telepon</Form.Label>
              <Form.Control
                id={`${index}`}
                type="number"
                required
                name="phone_number"
       
                onChange={(e) =>
                  setCombine((prev) => ({
                    ...prev,
                    [e.target.id]: {
                      ...prev[Object.keys(e.target.id)],
                      [e.target.name]: e.target.value,
                    },
                  }))
                }
              />
            </Form.Group>
          </Row>
    
              <Form.Group className="mb-3">
                <Form.Label>Akses Manuju Jalur 1</Form.Label>
                <Form.Control
                  id={`${index}`}
                  required
                  as="textarea"
                  rows={3}
                  name={`1`}
           
                  onChange={(e) =>
                    setCombine((prev) => ({
                      ...prev,
                      [e.target.id]: {
                        ...prev[Object.keys(e.target.id)],
                        accessibility: {
                          ...prev[Object.keys(e.target.id)].accessibility,
                          [e.target.name]: e.target.value,
                        },
                      },
                    }))
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Akses Manuju Jalur 2 (optional)</Form.Label>
                <Form.Control
                  id={`${index}`}
                  as="textarea"
                  rows={3}
                  name={`2`}
          
                  onChange={(e) =>
                    setCombine((prev) => ({
                      ...prev,
                      [e.target.id]: {
                        ...prev[Object.keys(e.target.id)],
                        accessibility: {
                          ...prev[Object.keys(e.target.id)].accessibility,
                          [e.target.name]: e.target.value,
                        },
                      },
                    }))
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Akses Manuju Jalur 3 (optional)</Form.Label>
                <Form.Control
                  id={`${index}`}
                  as="textarea"
                  rows={3}
                  name={`3`}
        
                  onChange={(e) =>
                    setCombine((prev) => ({
                      ...prev,
                      [e.target.id]: {
                        ...prev[Object.keys(e.target.id)],
                        accessibility: {
                          ...prev[Object.keys(e.target.id)].accessibility,
                          [e.target.name]: e.target.value,
                        },
                      },
                    }))
                  }
                />
              </Form.Group>

        </React.Fragment>
      ))}

      <div className="tombol-aksi">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => handleAddFields()}
        >
          +
        </button>
        {inputField.length === 1 ? '' :  <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDeleteFields()}
          style={{ marginLeft:"5px" }}
        >
          -
        </button>}
       
    
      </div>
      <div className="tmbl text-center">
      <button  className="btn btn-success">Submit</button>
      </div>
      </Form>
     
    </>
  );
};
