import axios from "axios";
import React, { useState } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./Register.scss";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    confPass: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();
    if (formData.confPass !== formData.password) {
      setError(true);
    } else {
      setError(false);
      console.log(formData)
      const data = new FormData();
      data.append("document", JSON.stringify(formData));
      try {
        await axios.post(
          "https://hiker-summit.herokuapp.com/api/v1/auth/register",
          data
        );

        navigate("/login");
      } catch (error) {
        // if(error.response){

        console.log(error);
        // setMsg(error.response.data.msg)
      }
    }
  };

  return (
    <div className="signup-container">
      <Container>
        <div className="signup-content">
          <Row className="combiner">
          <Col lg={5} md={12}>
         
            <div
              className="pt-4"
              data-aos="fade-right"
              data-aos-duration="2000"
            >
              <h3>Bergabung menjadi bagian Hiker Summit sekarang</h3>

              <Form className="pt-2" onSubmit={submitForm}>
                <Row className="mb-2">
                  <Col lg="6">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      value={formData.first_name}
                      placeholder="Nama Depan"
                      name="firstname"
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          first_name: event.target.value,
                        })
                      }
                      required
                    />
                  </Col>
                  <Col lg="6">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      value={formData.last_name}
                      name="last_name"
                      placeholder="Nama Belakang"
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          last_name: event.target.value,
                        })
                      }
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col lg="12">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={formData.email}
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          email: event.target.value,
                        })
                      }
                      required
                    />
                  </Col>
                  <Col lg="12">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      value={formData.username}
                      type="text"
                      name="username"
                      placeholder="Username"
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          username: event.target.value,
                        })
                      }
                      required
                    />
                  </Col>
                  <Col lg="12">
                    <Form.Label>Nomor Telephone</Form.Label>
                    <Form.Control
                      value={formData.phone_number}
                      type="text"
                      name="phone_number"
                      placeholder="Phone Number"
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          phone_number: event.target.value,
                        })
                      }
                      required
                    />
                  </Col>
                </Row>
                <Form.Group className="mb-2">
                  <Form.Label>Kata Sandi</Form.Label>
                  <Form.Control
                    value={formData.password}
                    type="password"
                    placeholder="Buat Kata Sandi"
                    name="password"
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        password: event.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Konfirmasi Kata Sandi</Form.Label>
                  <Form.Control
                    value={formData.confPass}
                    className={`form-control`}
                    type="password"
                    placeholder="Konfirmasi Kata Sandi"
                    name="confirmPassword"
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        confPass: event.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                {error ? <p>Passoword Tidak Sama</p> : ""}

                <button type="submit" className="btn btn-dark w-100">
                  SignUp
                </button>
              </Form>
              <p className="text-center pt-3">
                Sudah Punya Akun ?{" "}
                <NavLink to="/login">
                  <b className="b">Login</b>
                </NavLink>
              </p>
            </div>
          </Col>
          <Col lg={7} md={12} className="images">
        
            <img src="./img/regist.png" alt="" />
      
          </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
