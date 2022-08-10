import React, { useState, useEffect } from "react";
import {
  Container,
  Tab,
  Tabs,
  Carousel,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Aksebilitas from "./TabsDisplay/Aksebilitas";
import Aturan from "./TabsDisplay/Aturan";
import InformasiUmum from "./TabsDisplay/InformasiUmum";
import Lokasi from "./TabsDisplay/Lokasi";
import { publicAxiosInstance } from "../../Instance/axiosInstance";
import "./Destination.scss";
import { useSelector } from "react-redux";
import "./Carousels.scss";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import ReactStars from "react-rating-stars-component";
import moment from "moment";

const Destination = () => {
  const [key, setKey] = useState("informasiUmum");
  const [data, setData] = useState({});
  const privateInstance = useAxiosPrivate();
  const user = useSelector((state) => state.user.user);
  const params = useParams();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [rate, setRate] = useState({});
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: 0,
  });

  const [ticket, setTicket] = useState({
    user_id: user?._id,
    destination_id: params.id,
    subject: "",
    details: "",
  });

  const [nameUser, setNameUser] = useState(null);

  useEffect(() => {
    (async () => {
      const feedback = await publicAxiosInstance.get(
        `/api/v1/destinations/${params.id}`
      );
      const reviews = await publicAxiosInstance.get(
        `/api/v1/reviews?destination_id=${params.id}`
      );
      const users = await publicAxiosInstance.get("/api/v1/users/public");
      setData(feedback.data.result);
      setNameUser(users.data.result.docs);
      setRate(reviews.data.result.docs);
      setLoading(false);
    })();
  }, [params]);

  const AddReview = async (e) => {
    e.preventDefault();
    try {
      await privateInstance.post(
        `/api/v1/reviews/${user._id}?destination_id=${params.id}`,
        formData
      );

      window.location.reload(false);
    } catch (error) {
      alert(error);
    }
  };

  const handleTicket = async () => {
    await privateInstance.post(`/api/v1/tickets/user/${user._id}`, ticket);
    window.location.reload(false);
  };


  return (
    <>
      {data && (
        <section className="destination">
          <Carousel>
            {data?.content?.image_assets?.assets_key?.map((lel, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  style={{ height: "100vh" }}
                  src={`https://hiker-summit.herokuapp.com/api/v1/assets?bucket=${data.content.image_assets.bucket}&key=${lel}`}
                  alt="First slide"
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="tabs-content">
            <Container>
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="informasiUmum" title="Informasi Umum">
                  <InformasiUmum
                    title={data.title}
                    general_information={data.content?.general_information}
                    gambar={`https://hiker-summit.herokuapp.com/api/v1/assets?bucket=${data?.content?.image_assets?.bucket}&key=${data?.content?.image_assets?.assets_key[0]}`}
                    clicks={handleShow2}
                  />
                  <div className="comment-section">
                    <div className="container">
                      <div className="review">
                        <div className="review-aksi d-flex">
                          <h2 className="R-title">Ulasan</h2>
                          {user === null ? (
                            ""
                          ) : (
                            <Button variant="success" onClick={handleShow}>
                              Tulis Ulasan
                            </Button>
                          )}
                        </div>
                        <hr style={{ color: "black", height: "2px" }} />

                        <div className="comment-section">
                          {loading ? (
                            <p>Loading</p>
                          ) : (
                            <>
                              {rate?.map((item, index) => {
                                const gg = nameUser?.filter(
                                  (ele) => ele._id === item.user_id
                                );
                                console.log(nameUser)
                                console.log(rate)
                               
                                return (
                                  <React.Fragment key={index}>
                                    <div class="media media-review mb-3">
                                      <div className="media-user mb-2">
                                        <img
                                          src={
                                            gg[0].image_assets.bucket ===
                                            null ? (
                                              <p>kosong</p>
                                            ) : (
                                              `https://hiker-summit.herokuapp.com/api/v1/assets?bucket=${gg[0].image_assets.bucket}&key=${gg[0].image_assets.assets_key}`
                                            )
                                          }
                                          alt=""
                                        />
                                      </div>
                                      <div className="media-body">
                                        <div className="M-flex">
                                          <h2
                                            className="title"
                                            style={{
                                              textTransform: "Capitalize",
                                            }}
                                          >
                                            <span>
                                              {gg[0].first_name}{" "}
                                              {gg[0].last_name}
                                              <br />
                                              <p className="pt-2" style={{ fontSize:"15px" }}>{moment(item.createdAt).format('LLL')}</p>
                                            </span>
                                          </h2>
                                          
                                          <div className="rating-row">
                                            <ul>
                                              {item.rating === 1 ? (
                                                <li className="">
                                                  <i className="fa fa-star"></i>
                                                </li>
                                              ) : item.rating === 2 ? (
                                                <>
                                                  {" "}
                                                  <li className="">
                                                    <i className="fa fa-star"></i>
                                                  </li>
                                                  <li className="">
                                                    <i className="fa fa-star"></i>
                                                  </li>
                                                </>
                                              ) : item.rating === 3 ? (
                                                <>
                                                  {" "}
                                                  <li className="">
                                                    <i className="fa fa-star"></i>
                                                  </li>
                                                  <li className="">
                                                    <i className="fa fa-star"></i>
                                                  </li>
                                                  <li className="">
                                                    <i className="fa fa-star"></i>
                                                  </li>
                                                </>
                                              ) : item.rating === 4 ? (
                                                <>
                                                  <li className="">
                                                    <i className="fa fa-star"></i>
                                                  </li>
                                                  <li className="">
                                                    <i className="fa fa-star"></i>
                                                  </li>
                                                  <li className="">
                                                    <i className="fa fa-star"></i>
                                                  </li>
                                                  <li className="">
                                                    <i className="fa fa-star"></i>
                                                  </li>
                                                </>
                                              ) : (
                                                <>
                                                  <li className="">
                                                    <i className="fa fa-star"></i>
                                                  </li>
                                                  <li className="">
                                                    <i className="fa fa-star"></i>
                                                  </li>
                                                  <li class="">
                                                    <i class="fa fa-star"></i>
                                                  </li>
                                                  <li className="">
                                                    <i className="fa fa-star"></i>
                                                  </li>
                                                  <li className="">
                                                    <i className="fa fa-star"></i>
                                                  </li>
                                                </>
                                              )}
                                            </ul>
                                          </div>
                                        </div>
                                        <h5>{item.title}</h5>
                                        <div class="description p-2">
                                          {item.description}
                                        </div>
                                        
                                      </div>
                                    </div>
                                  </React.Fragment>
                                );
                              })}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="aturan" title="Aturan">
                  <Aturan judul={data} konten={data} />
                </Tab>
                <Tab eventKey="lokasi" title="Lokasi">
                  <Lokasi konten={data} judul={data} />
                </Tab>
                <Tab eventKey="aksebilitas" title="Aksebilitas">
                  <Aksebilitas judul={data} konten={data} />
                </Tab>
              </Tabs>
            </Container>
          </div>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>
              <Modal.Title className="text-center">
                Give Us Your Review
              </Modal.Title>
              <div className="rate">
                <ReactStars
                  count={5}
                  onChange={(newRating) =>
                    setFormData({ ...formData, rating: newRating })
                  }
                  size={60}
                  activeColor="#ffd700"
                />{" "}
              </div>
              <Form.Label column sm="4">
                Judul
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(event) =>
                  setFormData({ ...formData, title: event.target.value })
                }
              />
              <Form.Label column sm="4">
                Deskripsi
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(event) =>
                  setFormData({ ...formData, description: event.target.value })
                }
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={AddReview}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </section>
      )}

      <Modal show={show2} onHide={handleClose2} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            Berikan Informasi / Saran
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label column sm="4">
            Judul
          </Form.Label>
          <Form.Control
            placeholder="Contoh: informasi kurang lengkap / tepat.."
            type="text"
            onChange={(event) =>
              setTicket({ ...ticket, subject: event.target.value })
            }
          />
          <Form.Label column sm="4">
            Deskripsi
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(event) =>
              setTicket({ ...ticket, details: event.target.value })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleTicket}>
            Kirim
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Destination;
