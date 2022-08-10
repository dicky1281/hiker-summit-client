import React, { useState } from "react";
import "./Navigation.scss";
import { Nav, Navbar, Container, Offcanvas, Button, NavDropdown } from "react-bootstrap";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutHandler } from "../../../apiCalls/apiCalls";

const Navigation = () => {
  const expand = "lg";
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scroll, setScroll] = useState(false)
  const handleScroll = () =>{
    if(window.scrollY > 0){
      setScroll(true)
    }else{
      setScroll(false)
    }
  }

  window.addEventListener('scroll', handleScroll)

  const location = useLocation();
  const path = location.pathname.split('/')


  const Logout = () => {
    logoutHandler(dispatch);
    navigate('/home')
  }


  return (
    <header className={scroll ? "fixed-top sticky" : "fixed-top"} style={{ backgroundColor : path.includes('search') || (path.includes('explore') && path.length > 2) ? "#417269" : "transparent", padding : path.includes('search') ? "0px 0px" : ""}}>
      <Navbar key={expand} expand={expand}>
        <Container>
          <Navbar.Brand><NavLink to='/home'>HikerSummit</NavLink></Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                HikerSummit
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/explore">
                  Explore
                </NavLink>
                <NavLink className="nav-link" to="/guide">
                  Guide
                </NavLink>
                <NavLink className="nav-link" to="/suggest">
                  Suggest
                </NavLink>
                {!user?.accessToken ? (
                 <>
                 <NavLink to="/login">
                  <Button
                  variant="warning"
                  style={{ color: "white", background: "#E98B00",border:"none" }}
                >
                  Login
                </Button></NavLink>
                  <NavLink to="/register"><Button variant="dark">Sign Up</Button></NavLink>

                </>
                ): (  <>
                <div className="profile">
                <NavDropdown
                title={user?.username?.toUpperCase()}
                id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
               
                <Link className="dropdown-item" to={`/dashboard/akun/${user._id}`} style={{ color:"black" }}>My Dashboard</Link>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={Logout} style={{ color:"red" }}>Logout</NavDropdown.Item>
                
                
              </NavDropdown>
                </div>
                  
                  </>
               )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Navigation;
