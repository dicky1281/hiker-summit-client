import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
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
      
              <FirstForm
                nextStep={nextStep}
                prevStep={prevStep}
                formData={formData}
                setFormData={setFormData}
                image={image}
                setImage={setImage}
              />
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
              <ThirdForm
                nextStep={nextStep}
                prevStep={prevStep}
                formData={formData}
                setFormData={setFormData}
                image={image}
              />
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
