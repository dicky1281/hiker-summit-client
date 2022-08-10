import React, { useState } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import "./MultiForm.scss";
import { FirstForm } from "./FirstForm";
import { SecondForm } from "./SecondForm";
import { ThirdForm } from "./ThirdForm";
import { useEffect } from "react";

const MultiForm = () => {
  const [step, setstep] = useState(1);
  const [image, setImage] = useState([]);
  const [formData, setFormData] = useState({
    content: {
      general_information: "",
      rules: {
        attention: {},
        obligation: {},
        prohibition: {},
      },
    },
    difficulty: "",
    title: "",
    location: {
      city: "",
      island: "",
      province: "",
      track: [
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
      ],
    },
    price_per_day: "250000",
  });

  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };
  console.log(formData);

  //Add field
  const handleAddFields = (index) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        track: [
          ...prev.location.track,
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
        ],
      },
    }));
  };

  // delete Field
  const handleDeleteFields = (index) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        track: [...prev.location.track.splice(index, 1)],
      },
    }));
  };
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <div className="form pt-5 mb-5">
          <Container>
            <ul className="progressbar mb-5">
              <li className="active">Infomasi Gunung</li>
              <li>Hal-Hal Yang Perlu Diperhatikan</li>
              <li>Track Menuju Gunung</li>
            </ul>
            <Row>
              {formData?.location?.track.map((item, index) => (
                <div key={index}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama Track</Form.Label>
                    <Form.Control
                      id={index}
                      type="text"
                      name="track_name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama BaseCamp</Form.Label>
                    <Form.Control
                      id={`${index}`}
                      type="text"
                      name="basecamp_name"
                      required
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
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4" className="mb-3">
                      <Form.Label>Nama Jalan</Form.Label>
                      <Form.Control
                        id={`${index}`}
                        type="text"
                        required
                        name="road_name"
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4" className="mb-3">
                      <Form.Label>Nama Desa</Form.Label>
                      <Form.Control
                        id={`${index}`}
                        type="text"
                        name="village"
                        required
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
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4" className="mb-3">
                      <Form.Label>Kode Pos</Form.Label>
                      <Form.Control
                        id={`${index}`}
                        type="number"
                        required
                        name="postal_code"
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4" className="mb-3">
                      <Form.Label>Nomor Telepon</Form.Label>
                      <Form.Control
                        id={`${index}`}
                        type="number"
                        required
                        name="phone_number"
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
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Akses Manuju Jalur 2 (optional)</Form.Label>
                    <Form.Control
                      id={`${index}`}
                      as="textarea"
                      rows={3}
                      name={`2`}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Akses Manuju Jalur 3 (optional)</Form.Label>
                    <Form.Control
                      id={`${index}`}
                      as="textarea"
                      rows={3}
                      name={`3`}
                    />
                  </Form.Group>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-success"
                onClick={handleAddFields}
              >
                +
              </button>
              {formData.location.track.length === 1 ? (
                ""
              ) : (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteFields()}
                >
                  -
                </button>
              )}

              {/* <ThirdForm
                nextStep={nextStep}
                prevStep={prevStep}
                formData={formData}
                setFormData={setFormData}
                image={image}
              /> */}
            </Row>
          </Container>
        </div>
      );
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 2:
      return (
        <div className="form pt-5">
          <Container>
            <ul className="progressbar mb-5">
              <li>Infomasi Gunung</li>
              <li className="active">Panduan Gunung</li>
              <li>Track Menuju Gunung</li>
            </ul>
            <Row>
              <SecondForm
                nextStep={nextStep}
                prevStep={prevStep}
                formData={formData}
                setFormData={setFormData}
              />
            </Row>
          </Container>
        </div>
      );
    // Only formData is passed as prop to show the final value at form submit
    case 3:
      return (
        <div className="form pt-5">
          <Container>
            <ul className="progressbar mb-5">
              <li>Infomasi Gunung</li>
              <li>Hal-Hal Yang Perlu Diperhatikan</li>
              <li className="active">Track Menuju Gunung</li>
            </ul>
            <Row></Row>
          </Container>
        </div>
      );
    default:
      return (
        <div className="multi-form">
          <Container>
            <div className="multi-form-title pt-5">{/* Form Here */}</div>
          </Container>
        </div>
      );
  }
};

export default MultiForm;
