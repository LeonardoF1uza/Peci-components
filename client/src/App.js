
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage.js';
import CreateComp from './Pages/CreateComp.js';
import ReqForm from './Pages/ReqForm.js';
import 'bootstrap/dist/css/bootstrap.css';
import ReqList from './Pages/ReqList.js';
const App = () => {
  return (
    <>
      <head>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>

      </head>

      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/form" element={<ReqForm />} />
          <Route path="/create" element={<CreateComp />} />
          <Route path="/reqlist" element={<ReqList />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;