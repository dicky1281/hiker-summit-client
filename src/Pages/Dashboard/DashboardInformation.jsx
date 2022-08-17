import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { Container, Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import Modal from "./PopUp";
import { publicAxiosInstance } from "../../Instance/axiosInstance";
import moment from 'moment'

const DashboardInformation = () => {
  const user = useSelector((state) => state.user.user);
  const privateInstance = useAxiosPrivate();

  const [desti, setDesti] = useState(null);
  const [guide, setGuide] = useState(null)
  const [loading, setLoading] = useState(true);

  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const [show5, setShow5] = useState(false);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);
  const [tempData, setTempData] = useState([]);
  const getData = (
    title,
    status,
    city,
    island,
    province,
    track,
    general_information,
    content,
    attention,
    obligation,
    prohibition,
    lvl
  ) => {
    let tempData = [
      title,
      status,
      city,
      island,
      province,
      track,
      general_information,
      content,
      attention,
      obligation,
      prohibition,
      lvl
    ];
    setTempData((item) => [...tempData]);
    return setShow4(true);
  };
  


  const [ticket, setTicket] = useState({
    user_id: user._id,
    subject: "",
    details: "",
  });
  useEffect(() => {
    (async () => {
      const res = await publicAxiosInstance.get(`/api/v1/destinations`);
      const feed = await privateInstance.get('/api/v1/guides')
  setGuide(feed.data.result.docs)
      setDesti(res.data.result.docs);
      setLoading(false);
    })();
  });



  const handleTicket = async() =>{
  try {
    await privateInstance.post(`/api/v1/tickets/user/${user._id}`, ticket)
    setShow5(false)
    alert("Tiket Berhasil Dikirim!")
    
  } catch (error) {
    
  }
   
  }

  return (
    <>
      {loading ? (
        <div className="order-content">
          <div className="loadingio-spinner-rolling-mhmrujtmme">
            <div className="ldio-x7xj3ccq8ts">
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="information">
          <Container>
            <div className="header">
              <h2 className="title">Informasi Aktivitas</h2>
              <Button variant="primary" onClick={handleShow5}>
                Tulis Pesan
              </Button>
            </div>

            <div className="content">
              <Table responsive="lg">
                <thead>
                  <tr>
                    <th>Aktivitas</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {desti
                    .filter((id) => id.user_id === user._id)
                    .map((item,index) => {
                      return (
                        <React.Fragment key={index}>
                          <tr>
                            <td>Menyarankan Informasi Gunung</td>
                            <td>{moment(item.createdAt).format('MMM Do YY')}</td>
                            <td>
                              {" "}
                              {item.approved === "approved" ? (
                                <Button
                                  variant="success"
                                  style={{ color: "white" }}
                                >
                                  Diterima
                                </Button>
                              ) : (
                                <Button
                                  variant="warning"
                                  style={{ color: "white" }}
                                >
                                  Menunggu Persetujuan
                                </Button>
                              )}
                            </td>
                            <td>
                              <Button
                                variant="primary"
                                style={{ color: "white" }}
                                onClick={() =>
                                  getData(
                                    item.title,
                                    item.status,
                                    item?.location?.city,
                                    item?.location?.island,
                                    item?.location?.province,
                                    item?.location,
                                    item?.content?.general_information,
                                    item?.content,
                                    item?.content?.rules?.attention,
                                    item?.content?.rules?.obligation,
                                    item?.content?.rules?.prohibition,
                                    item?.difficulty
                                  )
                                }
                              >
                                Selengkapnya
                              </Button>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                    {guide?.filter((id)=> id.user_id === user._id).map((item,index)=>{
                      return(
                        <React.Fragment key={index}>
                        {item.status === 'unactive' ? (<tr>
                        <td>Mengajukan Sebagai Guide</td>
                        <td>{item.createdAt}</td>
                        <td> <Button
                                  variant="warning"
                                  style={{ color: "white" }}
                                >
                                  Menunggu Persetujuan
                                </Button></td>
                                <td></td>
                      </tr>):''}
                         
                        </React.Fragment>
                       

                      )
                    })}
                   

                    
                </tbody>
              </Table>
            </div>
          </Container>
        </div>
      )}
      <Modal
        show4={show4}
        handleClose4={handleClose4}
        title2={tempData[0]}
        location1={tempData[4]}
        location2={tempData[3]}
        location3={tempData[2]}
        jal={tempData[5]}
        genif={tempData[6]}
        gambs={tempData[7]}
        perh={tempData[8]}
        kew={tempData[9]}
        lar={tempData[10]}
        lvl={tempData[11]}
      />
      <Modal
        show5={show5}
        handleClose5={handleClose5}
        desc={ticket.details}
        Cdesc={(event) => setTicket({ ...ticket, details: event.target.value })}
        judul={ticket.subject}
        Cjudul={(event) =>
          setTicket({ ...ticket, subject: event.target.value })
        }
        click4={handleTicket}
      />
    </>
  );
};

export default DashboardInformation;
