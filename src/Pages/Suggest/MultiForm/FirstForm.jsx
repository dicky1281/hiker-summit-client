import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import validator from "validator";

export const FirstForm = ({ formData, setFormData, nextStep,image,setImage }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [desti, setDesti] = useState(null);

  useEffect(() => {
    (async () => {
      const feedback = await axios.get(`/api/v1/destinations`);
      setDesti(feedback.data.result.docs);
    })();
  }, []);

  const ei = desti?.filter(
    (name) => name?.title.toUpperCase() === formData.title
  );
  const ai = desti?.filter(
    (name) => name?.title.toLowerCase() === formData.title
  );
  const ui = desti?.filter((name) => name?.title === formData.title);



  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    if (ei?.[0]?.title.toUpperCase() === formData.title) {
      setError(true);
    } else if (ai?.[0]?.title.toLowerCase() === formData.title) {
      setError(true);
    } else if (ui?.[0]?.title === formData.title) {
      setError(true);
    } else if (validator.isEmpty(formData.title) || validator.isEmpty(formData.difficulty) || validator.isEmpty(formData.location.island) || validator.isEmpty(formData.location.province) || validator.isEmpty(formData.price_per_day)) {
      setError2(true);
    } else {
      setShow(true)
    }
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Nama gunung ini apa?</Form.Label>
          <Form.Control
            type="text"
            placeholder="contoh : tangkuban, krakatau"
            value={formData.title}
            onChange={(event) =>
              setFormData({ ...formData, title: event.target.value })
            }
          />
          {error ? (
            <Form.Text style={{ color: "red" }}>
              Destinasi Ini Sudah Tersedia Di HikerSummit!
            </Form.Text>
          ) : error2 ? (
            <Form.Text style={{ color: "red" }}>Wajib di isi!</Form.Text>
          ) : (
            ""
          )}
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" className="mb-3">
            <Form.Label htmlFor="disabledSelect">
              Tingkatan Gunung Tersebut Menurut Anda
            </Form.Label>
            <Form.Select
              value={formData.difficulty}
              onChange={(event) =>
                setFormData({ ...formData, difficulty: event.target.value })
              }
              id="disabledSelect"
            >
              <option>---</option>
              <option>pemula</option>
              <option>menengah</option>
              <option>ahli</option>
            </Form.Select>
            {error2 ? (
              <Form.Text style={{ color: "red" }}>Wajib di isi!</Form.Text>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Kota</Form.Label>
            <Form.Control
              type="text"
              placeholder="Contoh : bandung , jakarta..."
              value={formData.location.city}
              onChange={(event) =>
                setFormData((prevState) => ({
                  ...prevState,
                  location: { ...prevState.location, city: event.target.value },
                }))
              }
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Provinsi</Form.Label>
            <Form.Control
              type="text"
              placeholder="Contoh : jawa barat , jawa timur..."
              value={formData.location.province}
              onChange={(event) =>
                setFormData((prevState) => ({
                  ...prevState,
                  location: {
                    ...prevState.location,
                    province: event.target.value,
                  },
                }))
              }
            />
            {error2 ? (
              <Form.Text style={{ color: "red" }}>Wajib di isi!</Form.Text>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group as={Col} md="6" className="mb-3">
            <Form.Label htmlFor="disabledSelect">Pulau</Form.Label>
            <Form.Select
              value={formData.location.island}
              onChange={(event) =>
                setFormData((prevState) => ({
                  ...prevState,
                  location: {
                    ...prevState.location,
                    island: event.target.value,
                  },
                }))
              }
              id="disabledSelect"
            >
              <option>---</option>
              <option>jawa</option>
              <option>kalimantan</option>
              <option>papua</option>
              <option>sulawesi</option>
              <option>sumatera</option>
            </Form.Select>
            {error2 ? (
              <Form.Text style={{ color: "red" }}>Wajib di isi!</Form.Text>
            ) : (
              ""
            )}
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Masukkan Informasi Umum</Form.Label>
          <Form.Control
            as="textarea"
            value={formData.content.general_information}
            placeholder="Contoh : Gunung Tangkuban Parahu) adalah salah satu gunung yang terletak di Provinsi Jawa Barat, Indonesia. Sekitar 20 km ke arah utara Kota Bandung, dengan rimbun pohon pinus dan hamparan kebun teh di sekitarnya, Gunung Tangkuban Parahu mempunyai ketinggian setinggi 2.084 meter. "
            rows={3}
            onChange={(event) =>
              setFormData((prevState) => ({
                ...prevState,
                content: {
                  ...prevState.content,
                  general_information: event.target.value,
                },
              }))
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Masukkan Gambar Gunung</Form.Label>
          
                <Form.Control accept=".png, .jpeg, .jpg, .pdf" multiple type="file"  onChange={(event)=> setImage(event.target.files)}/>
            </Form.Group>
        <div className="next-prev">
          <Button variant="warning" type="button" onClick={submitFormData}>
            Lanjut
          </Button>
        </div>
      </Form>
      <Modal
        show={show}
        onHide={handleClose}
      
      >
        <Modal.Header>
          <Modal.Title>Data Gunung Yang Anda Masukkan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-content">
            <h6>Nama Gunung : {formData.title}</h6>
            <h6>Tingkatan: {formData.difficulty}</h6>
            <h6>Kota : {formData.location.city}</h6>
            <h6>Provinsi : {formData.location.province}</h6>
            <h6>Pulau : {formData.location.island}</h6>
            <br />
            <div className="form-info">
              <h6>Informasi Umum: </h6><p>{formData.content.general_information}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Not Yet!
          </Button>
          <Button variant="primary" onClick={()=> nextStep()}>Sure</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
