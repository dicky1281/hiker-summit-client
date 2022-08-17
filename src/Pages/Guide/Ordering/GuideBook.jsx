import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { publicAxiosInstance } from "../../../Instance/axiosInstance";
import CurrencyFormat from "react-currency-format";
import "./Ordering.scss";

function MyVerticallyCenteredModal(props) {
  const user = useSelector((state) => state.user.user);
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={true}
      data-aos="zoom-in"
    >
      <div className="modal-being">
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="icon-box">
            <i className="fas fa-check"></i>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="text-center">Berhasil</h4>
        <p className="text-center">
          Pengajuan Anda diterima, kami akan berikan informasi secepatnya
          melalui email mengenai langkah selanjutnya untuk dilakukan.
        </p>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "center" }}>
        <Button
          variant="secondary"
          style={{
            border: "none",
            width: "200px",
            height: "50px",
            color: "#9BA9B9",
            backgroundColor: "#D0DEEB",
          }}
          className="w-30"
          onClick={props.onHide}
        >
          Tutup
        </Button>
        <Link to={`/dashboard/akun/${user._id}`}>
          <Button
            variant="success"
            style={{
              width: "200px",
              height: "50px",
              backgroundColor: "#13c39c",
              border: "none",
            }}
            className="w-30"
            onClick={props.onHide}
          >
            Dashboard
          </Button>
        </Link>
      </Modal.Footer>
      </div>
    </Modal>
  );
}

const GuideBook = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = useSelector((state) => state.user.user);
  const privateInstance = useAxiosPrivate();

  const [modalShow, setModalShow] = useState(false);
  const [book, setBook] = useState({
    destination_id: null,
    track_route: [],
    date: {
      departure: "",
      arrival: "",
    },
    hiker_count: null,
    note: "",
    amount: 0,
  });


  const [destination, setDestination] = useState([]);
  const [selected, setSelected] = useState([]);
  const [track, setTrack] = useState(null);
  const [combine, setCombine] = useState({});

  const handleModal = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const handleTrack = () => {
    setBook((prev) => ({
      ...prev,
      track_route: [
        selected[0]?.location?.track.filter(
          (e) => e.track_name === Object.values(combine)[0]
        )[0],
      ],
    }));
  };

  useEffect(() => {
    publicAxiosInstance.get("/api/v1/destinations").then(
      ({
        data: {
          result: { docs },
        },
      }) => setDestination(docs.filter((e) => e.approved === "approved"))
    );

    handleTrack();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combine]);

  const convert = destination.filter((e) => e._id === book.destination_id);

  const submitHandler = async (e) => {
    e.preventDefault();
    setShow(false);
    try {
      await privateInstance.post(
        `/api/v1/bookings/users/${user._id}/destinations/${selected[0]._id}`,
        book
      );
      setModalShow(true);
    } catch (error) {
      
    }
  };

  const price = 250000;

  var a = new Date(book.date.arrival);
  var b = new Date(book.date.departure);
  var c = a.getTime() - b.getTime();
  var d = c / (1000 * 3600 * 24) + 1;

  return (
    <div className="sewa-guide d-flex">
      <Form className="col-lg-5 col-md-12" onSubmit={handleModal}>
        <fieldset>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledSelect">
              Pilih Gunung Tujuan
            </Form.Label>
            <Form.Select
              id="disabledSelect"
              required
              onChange={(event) => {
                setBook((prev) => ({
                  ...prev,
                  destination_id: event.target.value,
                }));
                setSelected(
                  destination.filter((e) => e._id === event.target.value)
                );
              }}
            >
              <option value="">---</option>
              {destination.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledSelect">
              Pilih Jalur Pendakian
            </Form.Label>
            <Form.Select
              id="track_name"
              required
              disabled={selected.length === 0 ? true : false}
              onChange={(event) => {
                setCombine((prev) => ({
                  ...prev,
                  [event.target.id]: event.target.value,
                }));
                setTrack(
                  selected[0]?.location?.track.filter(
                    (e) => e.track_name === event.target.value
                  )
                );
              }}
            >
              <option value="">---</option>
              {selected[0] &&
                selected[0]?.location?.track.map((e, i) => (
                  <option key={i} value={e.track_name}>
                    {e.track_name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <p>Tanggal Pendakian</p>
          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="disabledSelect">Naik</Form.Label>
              <Form.Control
                type="date"
                placeholder="First name"
                required
                onChange={(event) =>
                  setBook((prevState) => ({
                    ...prevState,
                    date: {
                      ...prevState.date,
                      departure: event.target.value,
                    },
                  }))
                }
              />
            </Col>
            <Col>
              <Form.Label htmlFor="disabledSelect">Turun</Form.Label>
              <Form.Control
                type="date"
                placeholder="Last name"
                required
                onChange={(event) =>
                  setBook((prevState) => ({
                    ...prevState,
                    date: {
                      ...prevState.date,
                      arrival: event.target.value,
                    },
                  }))
                }
              />
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledSelect">Harga Guide</Form.Label>
            <Form.Control type="text" disabled placeholder="Rp.250.000/hari" />
          </Form.Group>
          <Form.Label htmlFor="disabledSelect">Jumlah Pendaki</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max="5"
            placeholder="Jumlah Pendaki"
            className="mb-3"
            required
            onChange={(event) =>
              setBook({ ...book, hiker_count: event.target.value })
            }
          />
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          />
          <Form.Label>Tinggalkan Pesan.</Form.Label>
          <Form.Control
            as="textarea"
            className="mb-3"
            required
            rows={3}
            onChange={(event) => setBook({ ...book, note: event.target.value })}
          />

          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              required
              label="Saya setuju bahwa pemandu ditentukan oleh pihak HikerSummit yang telah disiapkan sebaik-mungkin."
            />
          </Form.Group>
          <Button type="submit" variant="success" className="mb-3">
            Ajukan
          </Button>
        </fieldset>
      </Form>
      <Modal show={show} onHide={handleClose} centered size="xs">
        <div className="modal-book">
          <h3 style={{ padding: "16px", textAlign: "center" }}>
            Informasi Detail
          </h3>

          <Modal.Body>
            <div className="form-content">
              <div className="konten d-flex">
                <h6>Gunung Tujuan</h6>
                <h6 style={{ fontWeight: "700" }}>
                  Gunung {convert?.[0]?.title}
                </h6>
              </div>
              <div className="konten d-flex">
                <h6>Jalur Pendakian</h6>
                <h6 style={{ fontWeight: "700" }}>
                  {book?.track_route?.[0]?.track_name}
                </h6>
              </div>
              <div className="konten d-flex">
                <h6>Tanggal Pendakian</h6>
                <h6 style={{ fontWeight: "700" }}>
                  {book?.date?.departure} - {book?.date?.arrival}
                </h6>
              </div>
              <div className="konten d-flex">
                <h6>Jumlah Pendaki</h6>
                <h6 style={{ fontWeight: "700" }}>{book?.hiker_count} Orang</h6>
              </div>
              <div
                className="konten d-flex"
                style={{
                  justifyContent: "space-between",
                  padding: "0px 20px 0px 20px",
                  flexDirection: "column",
                }}
              >
                <h6>Catatan:</h6>
                <h6 style={{ opacity: "0.7" }}>{book?.note}</h6>
              </div>
              <div className="konten d-flex">
                <h6>Total Harga</h6>
                <h6 style={{ fontWeight: "700", color: "#FF9800" }}>
                  <CurrencyFormat
                    value={price * d}
                    decimalSeparator={","}
                    displayType={"text"}
                    thousandSeparator={"."}
                    prefix={"Rp."}
                  />
                </h6>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "center" }}>
            <Button
              style={{
                border: "none",
                width: "200px",
                height: "50px",
                color: "#9BA9B9",
                backgroundColor: "#D0DEEB",
              }}
              variant="secondary"
              onClick={handleClose}
            >
              Kembali
              <i className="mdi mdi-bell-minus-outline:"></i>
            </Button>
            <Button
              style={{
                width: "200px",
                height: "50px",
                backgroundColor: "#13c39c",
                border: "none",
              }}
              type="submit"
              onClick={submitHandler}
            >
              Ajukan
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <div className="sewa-guide-image col-lg-6 offset-lg-1 col-md-12">
        <img src="img/sewa.png" className="img-fluid" alt="" />
      </div>
    </div>
  );
};

export default GuideBook;
