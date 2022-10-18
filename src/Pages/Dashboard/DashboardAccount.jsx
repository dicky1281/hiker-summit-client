import React, { useState } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUserData, PutHandler, sendEmailVerify, updateImage } from "../../apiCalls/apiCalls";
import Modal from "./PopUp";
import {
  lastName,
  name,
  phone,
  username,
  updateProfilePicture,
} from "../../features/userSlice";
import "./Dashboard.scss";
import { useEffect } from "react";

const DashboardAccount = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const privateInstance = useAxiosPrivate();

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const [stats , setStats] = useState(null)
  const [confirm, setConfirm] = useState({
    ConfPass: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    _id: user._id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    status: user.user_status,
    email: user.email,
    phone_number: user.phone_number,
  });

  const handlePutName = async (e) => {
    
    PutHandler(dispatch, privateInstance, user, formData);
  };

  const handlePutPass = async (e) => {
    if (confirm.ConfPass !== confirm.password) {
      setError(true);
    } else {
      setError(false);
      PutHandler(dispatch, privateInstance, user, { ...formData, ...confirm });
      handleClose3();
    }
  };

  const handleSend = async (e) => {
    const files = e.target.files[0];
    const data = new FormData();
    data.append("image", files);
      dispatch(updateImage(dispatch,privateInstance, user._id , data))   
  };

  const getStats = async () => {
    const response = dispatch(getUserData(privateInstance, user._id))
    setStats(response.data.result)
  }

useEffect(()=>{
  getStats()
},[])

  const handleVerify = async () => {
    dispatch(sendEmailVerify(privateInstance, user._id))
  };

  const lol = () => {
    handlePutName();
    handleClose2();
  };

  return (
    <div className="account">
      <Container>
        <h2 className="profile">My Profile</h2>
        <Row className="row-profile">
          <Col lg={5} md={12}>
            <div className="profile-detail">
              <div className="detail">
                <label htmlFor="">Username</label>
                <p>{user.username}</p>
              </div>

              <div className="detail">
                <label htmlFor="">Email</label>
                <p>{user.email}</p>
              </div>

              <div className="detail">
                <label htmlFor="">Nama Depan</label>
                <p>{user.first_name}</p>
              </div>

              <div className="detail">
                <label htmlFor="">Nama Belakang</label>
                <p>{user.last_name}</p>
              </div>

              <div className="detail">
                <label htmlFor="">Status</label>
                <p>
                  {user.verified === false ? (
                    <p
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={handleVerify}
                    >
                      Tidak Terverifikasi
                    </p>
                  ) : (
                    "Terverifikasi"
                  )}
                </p>
              </div>

              <div className="detail">
                <label htmlFor="">Peran</label>
                <p>{stats === null ? user.user_status : stats.user_status}</p>
              </div>

              <div className="detail">
                <label htmlFor="">Nomor Hp</label>
                <p>0{user.phone_number}</p>
              </div>

              <div className="detail">
                <label htmlFor="">Kata Sandi</label>
                <p>*****</p>
              </div>
              <Button variant="warning" onClick={handleShow2}>
                Edit Profile
              </Button>
              <Button variant="warning" onClick={handleShow3}>
                Ganti Password
              </Button>
            </div>
          </Col>
          <Col lg={{ span: 5, offset: 2 }} className="profile-image">
            <div className="image">
              <img
                src={user.image_assets.assets_key === "" ? '/img/User.png' : `https://hiker-summit.herokuapp.com/api/v1/assets?bucket=user_assets&key=${user.image_assets.assets_key}`}
                alt=""
              />
              <Form.Group controlId="formFile" className="pt-4">
                <Form.Control accept=".png, .jpeg, .jpg, .pdf" type="file" onChange={handleSend} />
              </Form.Group>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal
        show2={show2}
        handleClose2={handleClose2}
        click2={lol}
        username={formData.username}
        Cusername={(event) =>
          setFormData({ ...formData, username: event.target.value })
        }
        Cfirst_name={(event) =>
          setFormData({ ...formData, first_name: event.target.value })
        }
        first_name={formData.first_name}
        Clast_name={(event) =>
          setFormData({ ...formData, last_name: event.target.value })
        }
        last_name={formData.last_name}
        email={formData.email}
        Cnumber={(event) =>
          setFormData({ ...formData, phone_number: event.target.value })
        }
        number={formData.phone_number}
      ></Modal>
      <Modal
        show3={show3}
        handleClose3={handleClose3}
        password={confirm.password}
        Cpassword={(event) =>
          setConfirm({ ...confirm, password: event.target.value })
        }
        Confpassword={confirm.ConfPass}
        Chonfpassword={(event) =>
          setConfirm({ ...confirm, ConfPass: event.target.value })
        }
        error={error}
        click3={handlePutPass}
        er={
          error ? (
            <h5 className="pt-3" style={{ color: "red" }}>
              Password Tidak Sama
            </h5>
          ) : (
            ""
          )
        }
      ></Modal>
    </div>
  );
};

export default DashboardAccount;
