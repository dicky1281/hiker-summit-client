import React, { useState } from "react";
import { Modal, Row, Form, Button, Accordion } from "react-bootstrap";
import "./PopUp.scss";
import CurrencyFormat from "react-currency-format";

const PopUp = (props) => {
  return (
    <>
      <div className="popup">
        <Modal show={props.show} onHide={props.hide} centered size="md">
          <Modal.Header closeButton>
            <Modal.Title>Unggah Bukti Pembayaran</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="payment-details">
              <h6 style={{ paddingLeft: "20px" }}>
                Pembayaran Melalui Transfer
              </h6>
              <div
                className="konten d-flex"
                style={{
                  justifyContent: "space-between",
                  padding: "0px 20px 0px 20px",
                }}
              >
                <h6>Bank</h6>
                <h6 style={{ fontWeight: "700" }}>BCA</h6>
              </div>
              <div
                className="konten d-flex"
                style={{
                  justifyContent: "space-between",
                  padding: "0px 20px 0px 20px",
                }}
              >
                <h6>No Rekening</h6>
                <h6 style={{ fontWeight: "700" }}>123123123</h6>
              </div>
              <div
                className="konten d-flex"
                style={{
                  justifyContent: "space-between",
                  padding: "0px 20px 0px 20px",
                }}
              >
                <h6>Atas Nama</h6>
                <h6 style={{ fontWeight: "700" }}>PT. Jelajah Berkah</h6>
              </div>
              <div
                className="konten d-flex"
                style={{
                  justifyContent: "space-between",
                  padding: "0px 20px 0px 20px",
                }}
              >
                <h6>Jumlah Tagihan</h6>
                <h6 style={{ fontWeight: "700" }}>
                  <CurrencyFormat
                    value={props.payment}
                    decimalSeparator={","}
                    displayType={"text"}
                    thousandSeparator={"."}
                    prefix={"Rp."}
                  />
                </h6>
              </div>
            </div>
            <h6
              style={{ paddingLeft: "20px", fontWeight: "400" }}
              className="pt-1"
            >
              Silahkan unggah bukti pembayaran setelah transfer dilakukan
            </h6>
            <Form.Group controlId="formFile" className="mb-3">
              <h6 className="text-center pt-1" style={{ fontWeight: "bold" }}>
                Bukti pembayaran (jpeg, jpg, png, pdf maksimal 1 mb)
              </h6>
              <Form.Control
                accept=".png, .jpeg, .jpg, .pdf"
                type="file"
                onChange={props.onChange}
              />
            </Form.Group>
            <div className="acc">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <img src="/img/BCA_LOGO.png" alt="" /> <p>ATM</p>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ol>
                      <li> Masukkan Kartu ATM</li>
                      <li> Masukkan PIN anda</li>
                      <li> Pilih menu Lainnya</li>
                      <li> Pilih menu transfer</li>
                      <li> Masukkan jumlah uang</li>
                      <li> Masukkan Nomor Rekening Perusahaan</li>
                      <li> Pilih Ya, dan Berhasil!!</li>
                    </ol>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <img src="/img/BCA_LOGO.png" alt="" /> <p>M-Banking</p>
                  </Accordion.Header>
                  <Accordion.Body>
                  <ol>
                      <li> Masukkan Kode Akses</li>
                      <li> Pilih M-Transfer</li>
                      <li> Daftarkan Rekening Perusahaan</li>
                      <li> Setelah terdaftar, pilih menu transfer antar rekening</li>
                      <li> Pilih rekening perusahaan yang sudah didaftarkan</li>
                      <li> Masukkan Nominal</li>
                      <li> Send, dan Berhasil!!</li>
                  </ol>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            <Button
              className="w-100 mt-2"
              variant="success"
              onClick={props.click}
            >
              Kirim
            </Button>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
        <Modal show={props.show2} onHide={props.handleClose2} centered>
          <Modal.Header closeButton>
            <Modal.Title>Update Your Profile Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label column sm="4">
              Username
            </Form.Label>
            <Form.Control
              type="text"
              value={props.username}
              onChange={props.Cusername}
            />
            <Form.Label column sm="4">
              First Name
            </Form.Label>
            <Form.Control
              type="text"
              value={props.first_name}
              onChange={props.Cfirst_name}
            />
            <Form.Label column sm="4">
              Last Name
            </Form.Label>
            <Form.Control
              type="text"
              value={props.last_name}
              onChange={props.Clast_name}
            />
            <Form.Label column sm="4">
              Email
            </Form.Label>
            <Form.Control type="email" value={props.email} disabled />
            <Form.Label column sm="4">
              Phone Number
            </Form.Label>
            <Form.Control
              type="number"
              value={props.number}
              onChange={props.Cnumber}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose2}>
              Close
            </Button>
            <Button variant="primary" onClick={props.click2}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={props.show3} onHide={props.handleClose3} centered>
          <Modal.Header closeButton>
            <Modal.Title>Update Your Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label column sm="4">
              Password
            </Form.Label>
            <Form.Control
              type="password"
              value={props.password}
              onChange={props.Cpassword}
            />
            <Form.Label column sm="4">
              Konfirmasi Password
            </Form.Label>
            <Form.Control
              type="password"
              value={props.Confpassword}
              onChange={props.Chonfpassword}
            />
            {props.er}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose3}>
              Close
            </Button>
            <Button variant="primary" onClick={props.click3}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          size="xl"
          show={props.show4}
          onHide={props.handleClose4}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Gunung {props.title2}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="lokasi">
              <h4>Lokasi </h4>
              <li>Provinsi : {props.location1}</li>
              <li>Pulau : {props.location2}</li>
              <li>Kota : {props.location3}</li>
              <li>Tingkatan : {props.lvl}</li>

            </div>
            <div className="informasi-umum pt-3">
              <h4>Informasi umum</h4>
              <p>{props.genif}</p>
            </div>
            <div className="perhatian">
              <h4>Perhatian</h4>
              {props.perh &&
                Object.values(props.perh).map((ele, index) => (
                  <React.Fragment key={index}>
                    <li>{ele}</li>
                  </React.Fragment>
                ))}
            </div>
            <div className="kewajiban pt-3">
              <h4>Kewajiban</h4>
              {props.kew &&
                Object.values(props.kew).map((ele, index) => (
                  <React.Fragment key={index}>
                    <li>{ele}</li>
                  </React.Fragment>
                ))}
            </div>
            <div className="larangan pt-3">
              <h4>Larangan</h4>
              {props.lar &&
                Object.values(props.lar).map((ele, index) => (
                  <React.Fragment key={index}>
                    <li>{ele}</li>
                  </React.Fragment>
                ))}
            </div>
            <div className="track">
              {props.jal?.track.map((item, index) => (
                <React.Fragment key={index}>
                  <h4 className="pt-3">Track ke : {index + 1}</h4>
                  <li>Nama Track: {item.track_name}</li>
                </React.Fragment>
              ))}
            </div>
            <div className="gambar">
              {props.gambs?.image_assets?.assets_key.map((lel, index) => (
                <React.Fragment key={index}>
                  <img
                    src={`https://hiker-summit.herokuapp.com/api/v1/assets?bucket=${props.gambs?.image_assets.bucket}&key=${lel}`}
                    alt=""
                  />
                </React.Fragment>
              ))}
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={props.show5} onHide={props.handleClose5} centered>
          <Modal.Header closeButton>
            <Modal.Title>Masukkan Permintaan Anda</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label column sm="4">
              Judul
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Contoh : informasi bagian perhatian salah..."
              value={props.judul}
              onChange={props.Cjudul}
            />
            <Form.Label column sm="4">
              Pesan
            </Form.Label>
            <Form.Control
              type="text"
              value={props.desc}
              onChange={props.Cdesc}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose5}>
              Close
            </Button>
            <Button variant="primary" onClick={props.click4}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={props.show6} onHide={props.close6} centered size="xs">
        <div className="modal-book">
          <h3 style={{ padding: "16px", textAlign: "center" }}>
            Informasi Detail
          </h3>

          <Modal.Body>
            <div className="form-content">
              <div className="konten d-flex">
                <h6>Gunung Tujuan</h6>
                <h6 style={{ fontWeight: "700", textTransform:"capitalize" }}>
                  Gunung {props.gunung}
                </h6>
              </div>
              <div className="konten d-flex">
                <h6>Tanggal Pendakian</h6>
                <h6 style={{ fontWeight: "700" }}>
                  {props.Date1} - {props.Date2}
                </h6>
              </div>
              <div className="konten d-flex">
                <h6>Jumlah Pendaki</h6>
                <h6 style={{ fontWeight: "700" }}>{props.hiker} Orang</h6>
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
                <h6 style={{ opacity: "0.7" }}>{props.notes}</h6>
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
              onClick={props.close6}
            >
              Tutup
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
              onClick={()=>props.click6(props.id6)}
            >
              Terima
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
      </div>
    </>
  );
};

export default PopUp;
