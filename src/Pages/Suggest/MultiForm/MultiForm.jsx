import React, { useState } from "react";
import { Container, Row, Form, Col,Spinner } from "react-bootstrap";
import "./MultiForm.scss";
import { FirstForm } from "./FirstForm";
import { SecondForm } from "./SecondForm";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
 

const MultiForm = () => {
  
  const [step, setstep] = useState(1);
  const [image, setImage] = useState(null);
  const [selectedImg, setSelectedImg] = useState([])
  const [loading , setLoading] = useState(false)
  const privateInstance = useAxiosPrivate();
  const user = useSelector((state) => state.user.user);
  const [formData, setFormData] = useState({
    content: {
      general_information: "",
      rules: {
        attention: { 1: "" },
        obligation: { 1: "" },
        prohibition: { 1: "" },
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
          accessibility: { 1: "" },
        },
      ],
    },
    price_per_day: "250000",
  });

  const nextStep = (e) => {
    e.preventDefault()
    setstep(step + 1);
  };
  const nextStepFirst = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };



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
            accessibility: { 1: "" },
          },
        ],
      },
    }));
  };


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
  const Next = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const data = new FormData();
      data.append("document", JSON.stringify(formData));
      Object.values(image).forEach((element) => {
        data.append("image", element);
      });
      await privateInstance.post(`/api/v1/destinations/${user._id}`, data);
      window.location.reload(false);
    } catch (error) {
      alert(error);
    }
  };

  const select = (e) => {
    const selectFiles = e.target.files
    
    const selectFilesArray = Array.from(selectFiles)
    
    const imagesArray = selectFilesArray.map((file)=>{
      return URL.createObjectURL(file)
      
    })
    console.log(e.target.required)
    setSelectedImg(imagesArray)
    setImage(selectFiles)
  }


 
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      window.scroll(0, 680);
      return (
        <div className="form pt-5 mb-5">
          <Container>
            <ul className="progressbar mb-5">
              <li className="active" style={{ color: "green" }}>
                Infomasi Gunung
              </li>
              <li>Hal-Hal Yang Perlu Diperhatikan</li>
              <li>Track Menuju Gunung</li>
              <li>Gambar Gunung</li>
            </ul>
            <Row>
           
              <FirstForm
                nextStep={nextStepFirst}
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
              <li>Gambar Gunung</li>
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
              <li>Gambar Gunung</li>
            </ul>
            <Row>
              <h3 className="pb-3">Masukan Track Yang Anda Ketahui</h3>
              <Form onSubmit={nextStep}>
                {formData?.location?.track.map((item, index) => (
                  <div className="pb-5" key={index}>
                    <h4>Jalur Ke {index + 1}</h4>
                    <Form.Group className="mb-3">
                      <Form.Label>Nama Track</Form.Label>
                      <Form.Control
                        id={`${index}`}
                        type="text"
                        name="track_name"
                        value={item.track_name}
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
                        value={item.basecamp_name}
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
                        value={item.description}
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
                          value={item.district}
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
                          value={item.road_name}
                          onChange={addTrack}
                          name="road_name"
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="4" className="mb-3">
                        <Form.Label>Nama Desa</Form.Label>
                        <Form.Control
                          id={`${index}`}
                          type="text"
                          value={item.village}
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
                          value={item.ward}
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
                          value={item.postal_code}
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
                          value={item.phone_number}
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
                            id={`${index}`}
                            required
                            as="textarea"
                            rows={3}
                            value={e[1]}
                            name={`${i + 1}`}
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
                      Tambah Akses
                    </button>

                    <button
                      id={`${index}`}
                      type="button"
                      className="btn btn-success"
                      onClick={removeAccessibilityField}
                      style={{ marginLeft: "10px" }}
                    >
                      Kurangi Akses
                    </button>
                  </div>
                ))}

                <div className="tombol-aksi pt-2 pb-2">
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
                      style={{ marginLeft: "7px" }}
                    >
                      -
                    </button>
                  )}
                </div>
                <div className="np pt-3 text-center">
                  <button
                    className="btn btn-warning"
                    style={{ marginRight: "10px" }}
                    type="button"
                    onClick={prevStep}
                  >
                    Kembali
                  </button>
                  <button className="btn btn-success">Lanjut</button>
                </div>
              </Form>
            </Row>
          </Container>
        </div>
      );
    case 4:
      return (
        <div className="form pt-5">
          <Container>
            <ul className="progressbar mb-5">
              <li>Infomasi Gunung</li>
              <li>Hal-Hal Yang Perlu Diperhatikan</li>
              <li>Track Menuju Gunung</li>
              <li className="active">Gambar Gunung</li>
            </ul>
            <Row>
            <Form onSubmit={Next}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Masukkan Gambar Gunung</Form.Label>

                  <Form.Control
                    accept=".png, .jpeg, .jpg"
                    multiple
                
                    type="file"
                    required={selectedImg.length === 0 ? true : false}
                    onChange={select}
                  />
                </Form.Group>
                {selectedImg.length > 0 ? (<div className="imge text-center">
                <h5 className="pb-4">Berikut gambar yang telah anda pilih:</h5>
              <Row>
                {selectedImg && selectedImg.map((i, index)=>{
                  return(
                    
                      <Col lg={3} md={6} xm={12}>
                      <img style={{  height:"200px" }} src={i} alt="" />
                    </Col>
                    
                    
                  )
                })}
                </Row>
              </div>):''}
              
              <div className="np pt-3 text-center">
                  <button
                    className="btn btn-warning"
                    style={{ marginRight: "10px" }}
                    type="button"
                    onClick={prevStep}
                  >
                    Kembali
                  </button>
                  <button className="btn btn-success">{loading ? (<Spinner animation="border" size='sm' variant="light" />) : <>Submit</>}</button>
                </div>
              </Form>
              {/* <Form onSubmit={Next}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Masukkan Gambar Gunung</Form.Label>

                  <Form.Control
                    accept=".png, .jpeg, .jpg"
                    multiple
                    type="file"
                    required
                    onChange={(event) => setImage(event.target.files)}
                  />
                </Form.Group>

                <button className="btn btn-success">Submit</button>
              </Form> */}
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
