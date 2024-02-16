import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Admin from './Pages/Admin';
import Cart from './Components/Cart'
import "./App.css"
import { GlobalStateProvider } from './Components/GlobalStateContext';
import Navs from './Components/Navs';



function App() {
  return (
    <Router>
      <GlobalStateProvider>
        <div id="page">
          <Navs />
          <div id="content">
            <Routes id="page">
              <Route path="/" element={<Home />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/Cart" element={<Cart />} />
            </Routes>
          </div>
        </div>
      </GlobalStateProvider>
    </Router>
  );
}

export default App;