import React, { useState } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import "./MultiForm.scss";
import { FirstForm } from "./FirstForm";
import { SecondForm } from "./SecondForm";
import { ThirdForm } from "./ThirdForm";

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
          accessibility: { 0: ""},
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

  // console.log(formData);

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
            accessibility: { 0: ""},
          },
        ],
      },
    }));
  };

  console.log(formData);

  // delete Field
  const handleDeleteFields = () => {
    const baseDataset = { ...formData };
    baseDataset.location.track.pop();
    setFormData({ ...baseDataset });
  };

  const addTrack = (e) => {
    const targetId = +e.target.id;
    const baseDataset = { ...formData };
    const targetArr = baseDataset.location.track.find((_, i) => i === targetId);
    const modifiedState = { ...targetArr };

    if (isNaN(e.target.name)) {
      modifiedState[e.target.name] = e.target.value;
    } else {
      modifiedState["accessibility"][e.target.name] = e.target.value;
    }

    baseDataset.location.track = baseDataset.location.track.map((e, i) => {
      if (i === targetId) {
        return modifiedState;
      } else {
        return e;
      }
    });

    setFormData({ ...baseDataset });
  };

  const addAccessibilityField = (e) => {
    const targetId = +e.target.id;
    const baseDataset = { ...formData };
    const targetArr = baseDataset.location.track.find((_, i) => i === targetId);

    targetArr.accessibility = {
      ...targetArr.accessibility,
      [String(Object.entries(targetArr.accessibility).length + 1)]: "",
    };

    baseDataset.location.track = baseDataset.location.track.map((e, i) => {
      if (i === targetId) {
        return targetArr;
      } else {
        return e;
      }
    });

    setFormData({ ...baseDataset });
  };

  const removeAccessibilityField = (e) => {
    const targetId = +e.target.id;
    const baseDataset = { ...formData };
    const targetArr = baseDataset.location.track.find((_, i) => i === targetId);

    delete targetArr.accessibility[
      String(Object.entries(targetArr.accessibility).length)
    ];

    baseDataset.location.track = baseDataset.location.track.map((e, i) => {
      if (i === targetId) {
        return targetArr;
      } else {
        return e;
      }
    });

    setFormData({ ...baseDataset });
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
                  <h2>Jalur Ke {index + 1}</h2>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama Track</Form.Label>
                    <Form.Control
                      id={`${index}`}
                      type="text"
                      name="track_name"
                      required
                      onChange={addTrack}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama BaseCamp</Form.Label>
                    <Form.Control
                      id={`${index}`}
                      type="text"
                      name="basecamp_name"
                      required
                      onChange={addTrack}
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
                      onChange={addTrack}
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
                        onChange={addTrack}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4" className="mb-3">
                      <Form.Label>Nama Jalan</Form.Label>
                      <Form.Control
                        id={`${index}`}
                        type="text"
                        required
                        onChange={addTrack}
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
                        onChange={addTrack}
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
                        onChange={addTrack}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4" className="mb-3">
                      <Form.Label>Kode Pos</Form.Label>
                      <Form.Control
                        id={`${index}`}
                        type="number"
                        required
                        name="postal_code"
                        onChange={addTrack}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4" className="mb-3">
                      <Form.Label>Nomor Telepon</Form.Label>
                      <Form.Control
                        id={`${index}`}
                        type="number"
                        required
                        name="phone_number"
                        onChange={addTrack}
                      />
                    </Form.Group>
                  </Row>
                  {Object.entries(item.accessibility).map((e, i) => (
                    <React.Fragment key={e[0] + i}>
                      <Form.Group className="mb-3">
                        <Form.Label>Akses Manuju Jalur {i + 1}</Form.Label>
                        <Form.Control
                          id={`${i}`}
                          required
                          as="textarea"
                          rows={3}
                          name={`${i}`}
                          onChange={addTrack}
                        />
                      </Form.Group>
                    </React.Fragment>
                  ))}
                  
                  <button
                    id={`${index}`}
                    type="button"
                    className="btn btn-success"
                    onClick={addAccessibilityField}
                  >
                    add accessibility
                  </button>
                  {Object.entries(item.accessibility).length === 1 ? (""): <button
                    id={`${index}`}
                    type="button"
                    className="btn btn-success"
                    onClick={removeAccessibilityField}
                  >
                    remove accessibility
                  </button>}
                  
                </div>
              ))}
              {/* <FirstForm
                nextStep={nextStep}
                prevStep={prevStep}
                formData={formData}
                setFormData={setFormData}
                image={image}
                setImage={setImage}
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
            <Row>
           
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