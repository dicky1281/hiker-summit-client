import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutHandler } from "../../../apiCalls/apiCalls";
import "./SideBar.scss";

const SideBar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [btnState, setBtnstate] = useState(false);

  const Logout = () => {
    logoutHandler(dispatch);
    navigate("/home");
  };

  const handleClick = () => {
    setBtnstate((btnState) => !btnState);
  };

  let sidebar = btnState ? " open" : "";
  return (
    <div className={`sidebar${sidebar}`}>
      <div className="logo-details">
        <div className="logo_name">
          <NavLink to="/">HikerSummit</NavLink>
        </div>
        <i className={`bx bx-menu`} id="btn" onClick={handleClick}></i>
      </div>
      <ul className="nav-list">
        <li className="profile">
          <div className="profile-details">
            <img
              src={`https://hiker-summit.herokuapp.com/api/v1/assets?bucket=user_assets&key=${user.image_assets.assets_key}`}
              alt="profileImg"
            />
            <div className="name_job">
              <div className="name">{user.username}</div>
              <div className="job">{user.user_status}</div>
            </div>
          </div>
          <i className="bx bx-log-out" id="log_out" onClick={Logout}></i>
        </li>

        <li>
          <NavLink to={`/dashboard/akun/${user._id}`}>
            <i className="bx bx-user"></i>
            <span className="links_name">Akun</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/dashboard/pesanan/${user._id}`}>
            <i className="bx bx-receipt"></i>
            <span className="links_name">Pesanan</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/dashboard/informasi/${user._id}`}>
            <i className="fas fa-info-circle fa-fw"></i>
            <span className="links_name">Informasi</span>
          </NavLink>
        </li>
        <li>
        <NavLink to={`/dashboard/wishlist/${user._id}`}>
            <i className="bx bxs-bookmark"></i>
            <span className="links_name">Wishlist</span>
            </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
