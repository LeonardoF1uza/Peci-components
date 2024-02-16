import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import cn from "classnames";

/* Components */
import ComponentsPage from "./pages/ComponentsPage";
import ListPage from "./pages/ListPage.jsx";

import Header from "./components/Header";

/* Styling */
import { mainCss } from "./styling/index.js";
import Navbar from "./components/Navbar.jsx";

function App() {
  const [ptLanguage, setLanguage] = useState(true);
  const [collapseNavbar, setCollapseNavbar] = useState(true);

  const handleLanguage = () => {
    setLanguage(!ptLanguage);
  };

  const handleNavbar = () => {
    setCollapseNavbar(!collapseNavbar);
  };

  useEffect(() => {}, [ptLanguage, collapseNavbar]);

  return (
    <div className={cn(mainCss.container)}>
      <Header
        ptLanguage={ptLanguage}
        handleLanguage={handleLanguage}
        handleNavbar={handleNavbar}
      />
      <div className={cn(mainCss.horizontalDiv)}>
         <div className={cn(mainCss.leftSide)}>
        <Navbar
          collapseNavbar={collapseNavbar}
          handleNavbar={handleNavbar}
          ptLanguage={ptLanguage}
        />
      </div>
      <div className={cn(mainCss.rightSide)}>
        <Routes>
          <Route
            path="/"
            element={
              <ComponentsPage
                ptLanguage={ptLanguage}
                handleLanguage={handleLanguage}
                handleNavbar={handleNavbar}
              />
            }
          />
          <Route
            path="/list"
            element={
              <ListPage
                ptLanguage={ptLanguage}
                handleLanguage={handleLanguage}
                handleNavbar={handleNavbar}
              />
            }
          />
        </Routes>
      </div>
      </div>
     
    </div>
  );
}

export default App;
