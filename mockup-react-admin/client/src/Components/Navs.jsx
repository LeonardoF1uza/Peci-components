import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import mainLogo from '../assets/ua.png';
import menuButton from '../assets/menubut.png';
import Cart from '../assets/cart.png';
import { Link } from 'react-router-dom';


const Navs= () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleNavbar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <div>
        <nav className="navbar  navbar-light bg-light"  id="hornav">
            <Button variant="primary" id="navbutton" onClick={toggleNavbar}>
            <img  src={menuButton} id="menbutton"/>
            </Button>
            <img  src={mainLogo} id="uaimage"/>
            <form className="form-inline my-2 my-lg-0" id="navsearch">
              <Link to="/Cart"><img  src={Cart} id="cart"/></Link>

              <button className="butt btn my-2 my-sm-0" id="navsearchbutton" type="submit">$USER_NAME</button>
            </form>
        </nav>
      </div>
      <div className="d-flex">
        {isVisible && (
          <nav className="sidebar" id="navbar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link to="/Dashboard" className="nav-link active">Components</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Dashboard" className="nav-link">My orders</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Dashboard" className="nav-link">Products</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Admin" className="nav-link">Admin</Link>
                </li>
                {/* Add more items as needed */}
              </ul>
            </div>
          </nav>
        )}


      </div>
    </div>
  );
};

export default Navs;
