import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../GlobalComponent/Cards/Cards";
import HeroExplore from "./HeroExplore/HeroExplore";
import { useNavigate } from "react-router-dom";
import "./Explore.scss";
import {
  destinationSelectors,
  getDestinations,
} from "../../features/destinationSlice";
import { wishlist, wishlistRemove } from "../../features/userSlice";

function Explore() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const destination = useSelector(destinationSelectors.selectAll);
  const user = useSelector((state) => state.user.user);

  const [checked, setChecked] = useState({
    categories: {
      jawa: false,
      papua: false,
      sumatera: false,
      sulawesi: false,
      kalimantan: false,
    },
  });

  const [checked2, setChecked2] = useState({
    level: {
      pemula: false,
      menengah: false,
      ahli: false,
    },
  });

  useEffect(() => {
    dispatch(getDestinations());
  }, [dispatch]);

  const container = destination?.filter(name => name.approved === "approved") 

  const handleChange = (e) => {
    const { name } = e.target;
    setChecked((prevState) => {
      return {
        categories: {
          ...prevState.categories,
          [name]: !prevState.categories[name],
        },
      };
    });
  };

  const handleChange2 = (e) => {
    const { name } = e.target;
    setChecked2((prevState) => {
      return {
        level: {
          ...prevState.level,
          [name]: !prevState.level[name],
        },
      };
    });
  };

  const handleWishlist = (itemId) => {
    dispatch(wishlist(itemId));
    // PutHandler(dispatch, privateInstance, user, user)
  };

  const handleRemoveWish = (itemId) => {
    dispatch(wishlistRemove(itemId))
  }

  const searchText = () => {
    navigate("/search");
  };

  // eslint-disable-next-line array-callback-return
  const arr = container?.map((item, index) => (
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
  ));

  const checkedProducts = Object.entries(checked.categories)
    .filter((category) => category[1])
    .map((category) => category[0]);

  const checkedProducts2 = Object.entries(checked2.level)
    .filter((category) => category[1])
    .map((category) => category[0]);


  const filteredProducts = container
    ?.filter(({ location }) => checkedProducts.includes(location?.island))
    .map((item, index) => (
      <React.Fragment key={index}>
        <Cards
          going={`/explore/${item._id}`}
          stats={user === null ? "none" : ""}
      warna={user === null ? "transparent" :user.destination_wishlist.includes(item._id) ? "red":"black"}
        aksi={user === null ? '' :  user.destination_wishlist.includes(item._id)? () => handleRemoveWish(item._id) : ()=> handleWishlist(item._id)}
          imgs={`https://hiker-summit.herokuapp.com/api/v1/assets?bucket=${item.content.image_assets.bucket}&key=${item.content.image_assets.assets_key[0]}`}
          key={item.id}
          mouname={item.title}
          lokasi={item.location.province}
          kesulitan={item.difficulty}
        />
      </React.Fragment>
    ));
  const filteredProducts2 = container
    ?.filter(({ difficulty }) => checkedProducts2.includes(difficulty))
    .map((item, index) => (
      <React.Fragment key={index}>
        <Cards
          going={`/explore/${item._id}`}
          stats={user === null ? "none" : ""}
      warna={user === null ? "transparent" :user.destination_wishlist.includes(item._id) ? "red":"black"}
        aksi={user === null ? '' :  user.destination_wishlist.includes(item._id)? () => handleRemoveWish(item._id) : ()=> handleWishlist(item._id)}
          imgs={`https://hiker-summit.herokuapp.com/api/v1/assets?bucket=${item.content.image_assets.bucket}&key=${item.content.image_assets.assets_key[0]}`}
          key={item.id}
          mouname={item.title}
          lokasi={item.location.province}
          kesulitan={item.difficulty}
        />
      </React.Fragment>
    ));
  return (
    <>
      <HeroExplore searchBind={searchText} click={searchText} />
      <div className="filter-container">
        <div className="row">
          <div className="filter-item col-lg-2 col-md-12">
            <div className="filter-title">
              <h3>Filter</h3>
            </div>
            <h3>Pulau</h3>
            <Container>
            <label htmlFor="" className="cebox">
                Jawa
                <input
                  type="checkbox"
                  name="jawa"
                  value="jawa"
                  onChange={handleChange}
                  checked={checked.categories.jawa}
                />
              </label>
              <label htmlFor="" className="cebox">
                Kalimatan
                <input
                  type="checkbox"
                  name="kalimantan"
                  value="kalimantan"
                  onChange={handleChange}
                  checked={checked.categories.kalimantan}
                />
              </label>
              <label htmlFor="" className="cebox">
                Papua
                <input
                  type="checkbox"
                  name="papua"
                  value="papua"
                  onChange={handleChange}
                  checked={checked.categories.papua}
                />
              </label>
              <label htmlFor="" className="cebox">
                Sulawesi
                <input
                  type="checkbox"
                  name="sulawesi"
                  value="sulawesi"
                  onChange={handleChange}
                  checked={checked.categories.sulawesi}
                />
              </label>
              <label htmlFor="" className="cebox">
                Sumatera
                <input
                  type="checkbox"
                  name="sumatera"
                  value="sumatera"
                  onChange={handleChange}
                  checked={checked.categories.sumatera}
                />
              </label>
              
            </Container>
            
            <h3 className="tingkatan">Tingkatan</h3>
            <Container>
              <label htmlFor="" className="cebox">
                Pemula
                <input
                  type="checkbox"
                  name="pemula"
                  value="pemula"
                  onChange={handleChange2}
                  checked={checked2.level.pemula}
                />
              </label>
              <label className="cebox">
                Menengah
                <input
                  type="checkbox"
                  name="menengah"
                  value="menengah"
                  onChange={handleChange2}
                  checked={checked2.level.menengah}
                />
              </label>
              <label className="cebox">
                Ahli
                <input
                  type="checkbox"
                  name="ahli"
                  value="ahli"
                  onChange={handleChange2}
                  checked={checked2.level.ahli}
                />
              </label>
            </Container>
          </div>
          <div className="col-lg-9 col-md-12 mx-auto">
            <div className="main" data-aos="flip-up" data-aos-delay="500">
              {filteredProducts?.length >= 1
                ? filteredProducts
                : filteredProducts2?.length >= 1
                ? filteredProducts2
                : arr}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Explore;
