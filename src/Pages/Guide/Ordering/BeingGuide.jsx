import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { publicAxiosInstance } from "../../../Instance/axiosInstance";
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
          
            <div
              className="icon-box"
       
            >
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
        <Link to={`/dashboard/informasi/${user._id}`}>
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

const BeingGuide = () => {
  const user = useSelector((state) => state.user.user);
  const privateInstance = useAxiosPrivate();

  const [modalShow, setModalShow] = useState(false);
  const [guide, setGuide] = useState({
    hiking_experience: null,
    destination_id: "",
    track_route: "",
    allowed_hiker_count: null,
    note: "",
  });

  const [destination, setDestination] = useState([]);
  const [selected, setSelected] = useState([]);
  const [track, setTrack] = useState(null);

  useEffect(() => {
    publicAxiosInstance.get("/api/v1/destinations").then(
      ({
        data: {
          result: { docs },
        },
      }) => setDestination(docs.filter((e) => e.approved === "approved"))
    );
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    await privateInstance.post(`/api/v1/guides/${user._id}`,guide)
    setModalShow(true);
  };
  return (
    <>
      <div className="jadi-pemandu d-flex">
        <Form className="col-lg-5 col-md-12" onSubmit={onSubmit}>
          <fieldset>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">
                Pilih Gunung Tujuan
              </Form.Label>
              <Form.Select
                id="disabledSelect"
                required
                onChange={(event) => {
                  setGuide((prev) => ({
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
                id="disabledSelect"
                required
                disabled={selected.length === 0 ? true : false}
                onChange={(event) => {
                  setGuide((prev) => ({
                    ...prev,
                    track_route: event.target.value,
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
            <Form.Label htmlFor="disabledSelect">Pengalaman Mendaki</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="10"
              placeholder="Berapa Tahun ?"
              className="mb-3"
              required
              onChange={(event) => {
                setGuide((prev) => ({
                  ...prev,
                  hiking_experience: event.target.value,
                }));
              }}
            />
            <Form.Label htmlFor="disabledSelect">
              Maksimal Pendaki Yang Disanggupi
            </Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="10"
              placeholder="Berapa Pendaki ?"
              className="mb-3"
              required
              onChange={(event) => {
                setGuide((prev) => ({
                  ...prev,
                  allowed_hiker_count: event.target.value,
                }));
              }}
            />

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            />
            <Form.Label>Tentang Anda</Form.Label>
            <Form.Control
              required
              as="textarea"
              className="mb-3"
              rows={3}
              onChange={(event) => {
                setGuide((prev) => ({ ...prev, note: event.target.value }));
              }}
            />

            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check
                type="checkbox"
                label="Saya setuju bahwa pemandu ditentukan oleh pihak HikerSummit yang telah disiapkan sebaik-mungkin."
                required
              />
            </Form.Group>
            <Button variant="success" className="mb-3" type="submit">
              Ajukan
            </Button>
          </fieldset>
        </Form>

        <div className="sewa-guide-image col-lg-6 offset-lg-1 col-md-12">
          <img src="img/jadi.png" className="img-fluid" alt="" />
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default BeingGuide;
