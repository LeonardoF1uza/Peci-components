
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage.js';
import CreateComp from './Pages/CreateComp.js';


import ReqList from './Pages/ReqList.js';
const App = () => {
  return (
    <>
      <head>


      </head>

      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/create" element={<CreateComp />} />
          <Route path="/reqlist" element={<ReqList />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;