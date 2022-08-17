import React, { useEffect, useState } from "react";
import { Button, Container, Table, OverlayTrigger,Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { publicAxiosInstance } from "../../Instance/axiosInstance";
import Modal from "./PopUp";
import "./Dashboard.scss";

function DashboardOrder() {
  const user = useSelector((state) => state.user.user);
  const privateInstance = useAxiosPrivate();

  const [book, setBook] = useState(null);
  const [container, setContainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats , setStats] = useState(null)
  

  const [guide, setGuide] = useState(null);
  const [allBook, setAllBook] = useState(null);

  const handleClose4 = () => setShow4(false);
  const [show4, setShow4] = useState(false);

  const [show7, setShow7] = useState(false)
  const handleClose7 = () => setShow7(false)


  const [image, setImage] = useState([]);

  // Data for unggah bukti
  const [tempData, setTempData] = useState([]);
  const getData = (title, payment, id) => {
    let tempData = [title, payment, id];
    setTempData((item) => [...tempData]);
    return setShow4(true);
  };

  // Data for Guide
  const [temp, setTemp] = useState([])
  const getInfo = (title,depart, arrive, hikerCount , notes, id) =>{
    let temp = [title, depart, arrive, hikerCount, notes, id];
    setTemp((item) => [...temp])
    return setShow7(true)
  }

  const getBook = async () => {
    if (user.user_status === "umum") {
      const response = await publicAxiosInstance.get("/api/v1/guides");
      setGuide(response.data.result.docs);
    } else {
      const response = await publicAxiosInstance.get("/api/v1/guides");
      const feedback = await privateInstance.get(`/api/v1/bookings/guides/${user._id}`);
      setGuide(response.data.result.docs);
      setAllBook(feedback.data.result.docs);
    }
  };

  const getStats = async () => {
    const response = await privateInstance.get(`/api/v1/users/${user._id}`)
    setStats(response.data.result)
  }


  useEffect(() => {
    (async () => {
      const response = await privateInstance.get(
        `/api/v1/bookings/user/${user._id}`
      );
      const feedback = await publicAxiosInstance.get(`/api/v1/destinations`);
      setContainer(feedback.data.result.docs);
      setBook(response.data.result);
      setLoading(false);
    })();

  }, []);

  useEffect(() => {
      getBook();
      getStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 

  const guideUser = guide?.filter((ele) => ele.user_id === user._id);
  const finalGuideBook = allBook?.filter((ele)=> ele.destination_id === guideUser?.[0]?.destination_id).filter((a)=> a.hiker_count <= guideUser?.[0]?.allowed_hiker_count)
 


 

  const handleSend = async (id) => {
    const data = new FormData();
    Object.values(image).forEach((element) => {
      data.append("image", element);
    });
    await privateInstance.put(
      `/api/v1/bookings/payment/${user._id}?booking_id=${id}`,
      data
    );

    window.location.reload(false)
  };

  const handleAccept = async (book_id) => {
    try {
       await privateInstance.post(
        `/api/v1/bookings/${book_id}/guides/${user._id}`
      );
      window.location.reload(false);
    } catch (error) {
      alert(error);
    }
  };

  const handleCancel = async (book_id) => {
    try {
     await privateInstance.put(
        `/api/v1/bookings/${book_id}/users/${user._id}/cancel`
      );
      alert('Booking Berhasil Dibatalkan')
    } catch (error) {}
  };
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
        <div className="order">
          <Container>
            {stats?.user_status === "umum" ? (
              <>
                <h2 className="title">Pesanan Saya</h2>
                <Table responsive="lg text-center">
                  <thead>
                    <tr>
                      <th>Destinasi</th>
                      <th>Tanggal</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {book.map((item, index) => {
                      const a = container.filter(
                        (data) => data?._id === item?.destination_id
                      );
                      
                      return (
                        <React.Fragment key={index}>
                          <tr>
                            <td>{a[0]?.title}</td>
                            <td>
                              {item.date.departure} - {item.date.arrival}
                            </td>
                            <td>
                              {item.booking_status === "canceled" ? (
                                <Button variant="danger">Dibatalkan</Button>
                              ) : item.booking_status === "declined" ? (
                                <OverlayTrigger
                                key="bottom"
                                placement="bottom"
                                overlay={
                                  <Tooltip id="tooltip-bottom">
                                    Tooltip on <strong>test</strong>.
                                  </Tooltip>
                                }
                              >
                                <Button variant="danger">Ditolak</Button>
                              </OverlayTrigger>
                              ) : item.guide_id === "" ? (
                                <Button variant="warning">
                                  Menunggu Verifikasi Guide
                                </Button>
                              ) : item.proof_of_payment.assets_key === "" ? (
                                <Button variant="warning">
                                  Menunggu Pembayaran
                                </Button>
                              ) : item.paid_status === "unpaid" ? (
                                <Button variant="warning">
                                  Menunggu Verifikasi
                                </Button>
                              ) : (
                                <Button
                                  variant="success"
                                  style={{
                                    borderRadius: "8px",
                                    padding: "2px 30px 2px 30x",
                                    fontWeight: "700",
                                  }}
                                >
                                  Diterima
                                </Button>
                              )}
                            </td>
                            <td>
                              {item.booking_status === "canceled" ? (
                                ''
                              ) : item.booking_status === "declined" ? (
                                ''
                              ) : item.guide_id === '' ? (<Button
                                variant="danger"
                                onClick={() => handleCancel(item._id)}
                              >
                                Batalkan
                              </Button>) : item.proof_of_payment.assets_key === "" ? (
                                <Button
                                  variant="outline-warning"
                                  style={{ color:"orange" }}
                                  onClick={() =>
                                    getData(
                                      a[0].title,
                                      item.payment_amount,
                                      item._id
                                    )
                                  }
                                >
                                  Unggah Bukti
                                </Button>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </Table>
              </>
            ) : (
              <>
                <h2 className="title">Pesanan Saya</h2>
                <Table responsive="lg text-center">
                  <thead>
                    <tr>
                      <th>Destinasi</th>
                      <th>Tanggal</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                  {book.map((item, index) => {
                      const a = container.filter(
                        (data) => data?._id === item?.destination_id
                      );
                      return (
                        <React.Fragment key={index}>
                          <tr>
                            <td>{a[0]?.title}</td>
                            <td>
                              {item.date.departure} - {item.date.arrival}
                            </td>
                            <td>
                              {item.booking_status === "canceled" ? (
                                <Button variant="danger">Dibatalkan</Button>
                              ) : item.booking_status === "declined" ? (
                                <OverlayTrigger
                                key="bottom"
                                placement="bottom"
                                overlay={
                                  <Tooltip id="tooltip-bottom">
                                    <h6>{item.response_note}</h6>
                                  </Tooltip>
                                }
                              >
                                <Button variant="danger">Ditolak</Button>
                              </OverlayTrigger>
                              ) : item.guide_id === "" ? (
                                <Button variant="warning">
                                  Menunggu Verifikasi Guide
                                </Button>
                              ) : item.proof_of_payment.assets_key === "" ? (
                                <Button variant="warning">
                                  Menunggu Pembayaran
                                </Button>
                              ) : item.paid_status === "unpaid" ? (
                                <Button variant="warning">
                                  Menunggu Verifikasi
                                </Button>
                              ) : (
                                <Button
                                  variant="success"
                                  style={{
                                    borderRadius: "8px",
                                    padding: "2px 30px 2px 30x",
                                    fontWeight: "700",
                                  }}
                                >
                                  Diterima
                                </Button>
                              )}
                            </td>
                            <td>
                              {item.booking_status === "canceled" ? (
                                ''
                              ) : item.booking_status === "declined" ? (
                                ''
                              ) : item.guide_id === '' ? (<Button
                                variant="danger"
                                onClick={() => handleCancel(item._id)}
                              >
                                Batalkan
                              </Button>) : item.proof_of_payment.assets_key === "" ? (
                                <Button
                                  variant="outline-warning"
                                  style={{ color:"orange" }}
                                  onClick={() =>
                                    getData(
                                      a[0].title,
                                      item.payment_amount,
                                      item._id
                                    )
                                  }
                                >
                                  Unggah Bukti
                                </Button>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </Table>

                <h2 className="title">Pesanan Menjadi Guide</h2>
                <Table responsive="lg text-center">
                  <thead>
                    <tr>
                      <th>Destinasi</th>
                      <th>Tanggal</th>
                      <th>Rombongan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finalGuideBook?.map((item, index) => {
                      const b = container.filter(
                        (ele) => ele._id === item.destination_id
                      );
                      console.log(finalGuideBook)
                    
                      return (
                        <React.Fragment key={index}>
                          <tr>
                            <td className="pt-3">Gunung {b[0]?.title}</td>
                            <td className="pt-3">
                              {" "}
                              {item.date.departure} - {item.date.arrival}
                            </td>
                            <td className="pt-3">{item.hiker_count} Orang</td>
                            <td className="pt-3">
                              {item.booking_status === "canceled" ? <Button variant="danger">Dibatalkan</Button> : item.guide_id === "" ? (
                                <Button
                                  variant="outline-warning"
                                  style={{ color:"orange" }}
                                  onClick={() =>
                                    getInfo(
                                      b[0].title,
                                      item.date.departure,
                                      item.date.arrival,
                                      item.hiker_count,
                                      item.note,
                                      item._id
                                    )
                                  }
                                >
                                  View Details
                                </Button>
                              ) : (
                                <Button variant="success">Diterima</Button>
                              )}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </Table>
              </>
            )}
          </Container>
          <Modal
            show={show4}
            hide={handleClose4}
            gunung={tempData[0]}
            payment={tempData[1]}
            onChange={(event) => setImage(event.target.files)}
            click={() => handleSend(tempData[2])}
          />
          <Modal
          show6={show7}
          close6={handleClose7}
          gunung={temp[0]}
          Date1={temp[1]}
          Date2={temp[2]}
          hiker={temp[3]}
          notes={temp[4]}
          id6={temp[5]}
          click6={handleAccept}

           />
        </div>
      )}
    </>
  );
}

export default DashboardOrder;
