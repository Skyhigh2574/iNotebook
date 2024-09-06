import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';



const Navbar = ({darkTheme, toggleTheme}) => {
  let location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  
  const linkStyle = {
    color: darkTheme ? "rgb(200,200, 200)": "darkcyan", // Initial color
    textDecoration: 'none',
    fontWeight:'bold'
  };

  const linkHoverStyle = {
    color: darkTheme ? "white": "cadetblue",
     // Color on hover
  };

  // const themeChange = (darktheme) =>{
    
  //   if(darktheme=="true"){
  //     setdarktheme = false;
      
  //   }
  //   else{
  //     setdarktheme =  true;
  //   }
  // }
  
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{backgroundColor: darkTheme ?"black": "#c9e6ff", fontWeight:"bold"}}>

        <Link className="navbar-brand mx-3 my-2" style={{color: darkTheme ? "rgb(200,200, 200)": "darkcyan"}} to="#">iNotebook</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{color: darkTheme? "red": "blue"}}>
          <ul className="navbar-nav mr-auto" style={{foncolor: darkTheme? "red": "blue"}}>
            <li className={`nav-item ${location.pathname === "/home" ? "active" : ""}`}>
              <Link
                className="nav-link"
                to="/home"
                style={linkStyle}
                onMouseOver={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                onMouseOut={(e) => e.currentTarget.style.color = linkStyle.color}
              >
                Home
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === "/about" ? "active" : ""}`}>
              <Link
                className="nav-link"
                to="/about"
                style={linkStyle}
                onMouseOver={(e) => e.currentTarget.style.color = linkHoverStyle.color}
                onMouseOut={(e) => e.currentTarget.style.color = linkStyle.color}
              >
                About
              </Link>
            </li>
          </ul>
          <Nav className="ms-auto d-flex align-items-center">
            {/* Search bar and button in a horizontal direction */}
            <form className="d-flex my-2 my-lg-0 mx-3">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button  className="btn btn-outline-success" type="submit">Search</button>
            </form>

            {/* Dark mode switch */}
            <div className="form-check form-switch text-light mx-2" >
              <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={toggleTheme}/>
              <label className="form-check-label" style={{color: darkTheme ? "rgb(200,200, 200)": "darkcyan"}} htmlFor="flexSwitchCheckDefault">ThemeChange</label>
            </div>
          </Nav>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
