/* eslint-disable */
import React, { useState } from "react";
import { Form, Col, Row, Button, Modal } from "react-bootstrap";
import "./MultiForm.scss";

export const SecondForm = ({ formData, setFormData, nextStep, prevStep }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Next = (e) => {
    e.preventDefault();
    nextStep();
  };

  const handlePopUp = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const onSave = (event, index) => {
    let selectedKey = event.target.dataset.field;

    setFormData((prevState) => ({
      ...prevState,
      content: {
        ...prevState.content,
        rules: {
          ...prevState.content.rules,
          [selectedKey]: {
            ...prevState.content.rules[selectedKey],
            [event.target.name]: event.target.value,
          },
        },
      },
    }));
  };

  const handleAddFields = (e) => {
    const baseDataset = { ...formData };

    baseDataset.content.rules[e.target.name] = {
      ...baseDataset.content.rules[e.target.name],
      [String(
        Object.entries(baseDataset.content.rules[e.target.name]).length + 1
      )]: "",
    };

    setFormData({ ...baseDataset });
  };

  const handleDeleteFields = (e) => {
    const baseDataset = { ...formData };

    delete baseDataset.content.rules[e.target.name][
      String(Object.entries(baseDataset.content.rules[e.target.name]).length)
    ];

    setFormData({ ...baseDataset });
  };

  return (
    <Form onSubmit={nextStep}>
      <h4>Masukan hal yang menjadi Perhatian</h4>
      {Object.entries(formData.content.rules.attention).map((_, index) => (
        <div key={index + 1}>
          <Form.Group className="mb-3">
            <Form.Label>Nomor :{index + 1}</Form.Label>
            <Form.Control
              type="text"
              value={formData.content.rules.attention[index + 1]}
              name={index + 1}
              data-field="attention"
              required
              placeholder="Contoh : Diharap Membawa Tenda Sendiri"
              onChange={onSave}
            />
          </Form.Group>
        </div>
      ))}
      <div className="tombol-aksi pt-2 pb-3">
        <button
          type="button"
          className="btn btn-success"
          name="attention"
          onClick={handleAddFields}
        >
          +
        </button>
        {Object.entries(formData.content.rules.attention).length === 1 ? (
          ""
        ) : (
          <button
            type="button"
            name="attention"
            style={{ marginLeft: "5px" }}
            className="btn btn-danger"
            onClick={handleDeleteFields}
          >
            -
          </button>
        )}
      </div>

      <br></br>

      <h4>Masukan hal yang menjadi Kewajiban</h4>
      {Object.entries(formData.content.rules.obligation).map((_, index) => (
        <div key={index + 1}>
          <Form.Group className="mb-3">
            <Form.Label>Nomor :{index + 1}</Form.Label>
            <Form.Control
              type="text"
              name={index + 1}
              value={formData.content.rules.obligation[index + 1]}
              data-field="obligation"
              placeholder="Contoh : Harus Memakai Pakaian Serba Putih"
              onChange={onSave}
            />
          </Form.Group>
        </div>
      ))}
      <div className="tombol-aksi pt-2 pb-3">
        <button
          type="button"
          name="obligation"
          className="btn btn-success"
          onClick={handleAddFields}
        >
          +
        </button>
        {Object.entries(formData.content.rules.obligation).length === 1 ? (
          ""
        ) : (
          <button
            type="button"
            style={{ marginLeft: "5px" }}
            className="btn btn-danger"
            name="obligation"
            onClick={handleDeleteFields}
          >
            -
          </button>
        )}
      </div>
      <br />

      <h4>Masukan hal yang menjadi Larangan</h4>
      {Object.entries(formData.content.rules.prohibition).map((_, index) => (
        <div key={index + 1}>
          <Form.Group className="mb-3">
            <Form.Label>Nomor :{index + 1}</Form.Label>
            <Form.Control
              type="text"
              data-field="prohibition"
              name={index + 1}
              value={formData.content.rules.prohibition[index + 1]}
              placeholder="Contoh : Jangan Memetik Buah Di Gunung Ini"
              onChange={onSave}
            />
          </Form.Group>
        </div>
      ))}
      <div className="tombol-aksi pt-2 pb-3">
        <button
          type="button"
          name="prohibition"
          className="btn btn-success"
          onClick={handleAddFields}
        >
          +
        </button>
        {Object.entries(formData.content.rules.prohibition).length === 1 ? (
          ""
        ) : (
          <button
            type="button"
            style={{ marginLeft: "5px" }}
            className="btn btn-danger"
            name="prohibition"
            onClick={handleDeleteFields}
          >
            -
          </button>
        )}
      </div>
      <div className="next-prev">
      <Button variant="warning" onClick={prevStep}>
            Kembali
          </Button>
        <Button variant="success" type="submit">
          Lanjut
        </Button>
      </div>

      
    </Form>
  );
};