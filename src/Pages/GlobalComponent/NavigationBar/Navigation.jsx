import React, { useState } from "react";
import "./Navigation.scss";
import { Nav, Navbar, Container, Offcanvas, Button, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
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

  const Logout = () => {
    logoutHandler(dispatch);
    navigate('/home')
  }


  return (
    <header className={scroll ? "fixed-top sticky" : "fixed-top"}>
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
                  style={{ color: "white", background: "orange" }}
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
               
                <NavDropdown.Item><NavLink to={`/dashboard/akun/${user._id}`} style={{ color:"black" }}>My Dashboard</NavLink></NavDropdown.Item>
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
