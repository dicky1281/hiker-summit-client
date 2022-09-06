import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { publicAxiosInstance } from "../../../Instance/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { wishlist, wishlistRemove } from "../../../features/userSlice";
import Cards from "../../GlobalComponent/Cards/Cards";
import "./CardDisplay.scss";
import { PutHandler } from "../../../apiCalls/apiCalls";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";

const CardDisplay = () => {

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const privateInstance = useAxiosPrivate()

  const [destination, setDestination] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleWishlist = (itemId) => {
    dispatch(wishlist(itemId));
    // PutHandler(dispatch, privateInstance, user, user)
  };

  const handleRemoveWish = (itemId) => {
    dispatch(wishlistRemove(itemId))
  }

  const getAllDestination = async () => {
    const response = await publicAxiosInstance.get("/api/v1/destinations");
    setDestination(response.data.result.docs);
    setLoading(false);
  }

  const container = destination?.filter(name => name.approved === "approved") 
  useEffect(() => {
    getAllDestination();
  }, []);

  return (
    <>
      <div className="slide-card">
        <h1 className="slide-title text-center" data-aos="zoom-in">
          Bayangkan Petualanganmu<br></br>Selanjutnya
        </h1>
        <div className="card-mountain">
        
            {loading ? (
              <p>Loading</p>
            ) : (
              container.map((item, index) => (
                <React.Fragment key={index}>
                  <Cards
                  stats={user === null ? "none" : ""}
                  warna={user === null ? "transparent" :user.destination_wishlist.includes(item._id) ? "red":"black"}
                    aksi={user === null ? '' :  user.destination_wishlist.includes(item._id)? () => handleRemoveWish(item._id) : ()=> handleWishlist(item._id)}
                    going={`/explore/${item._id}`}
                    imgs={`https://hiker-summit.herokuapp.com/api/v1/assets?bucket=${item.content.image_assets.bucket}&key=${item.content.image_assets.assets_key[0]}`}
                    key={item.id}
                    mouname={item.title}
                    lokasi={item.location.province}
                    kesulitan={item.difficulty}
                  />
                </React.Fragment>
              ))
            )}
          </div>
       
        <div className="tombol text-center">
          <Button onClick={() => navigate("/explore")} variant="warning">
            Explore Lebih Lanjut
          </Button>
        </div>
      </div>
    </>
  );
};

export default CardDisplay;
