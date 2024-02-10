import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import mainLogo from '../assets/ua.png';
import menuButton from '../assets/menubut.png';
import Cart from '../assets/cart.png';
const Navs= () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleNavbar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <div>
        <nav class="navbar  navbar-light bg-light"  id="hornav">
            <Button variant="primary" id="navbutton" onClick={toggleNavbar}>
            <img  src={menuButton} id="menbutton"/>
            </Button>
            <img  src={mainLogo} id="uaimage"/>
            <form class="form-inline my-2 my-lg-0" id="navsearch">
              <a href='/Cart'><img  src={Cart} id="cart"/></a>

              <button class="butt btn my-2 my-sm-0" id="navsearchbutton" type="submit">$USER_NAME</button>
            </form>
        </nav>
      </div>
      <div className="d-flex">
        {isVisible && (
          <nav className="sidebar" id="navbar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="/Dashboard">
                    Components
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    My Orders
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Admin">
                    Admin
                  </a>
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
