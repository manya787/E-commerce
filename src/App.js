import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import './assets/styles/chat.css';
import './assets/styles/globals.css';
import './assets/styles/rtl.css';
import './assets/styles/dark.css';
import './assets/styles/leftSidebarDark.css';
import { routesName } from './Routes/routes';
import Dashboard from './Components/Dashboard/Dashboard';
import Cart from './Components/AddToCart/Cart';
import ShoppingCartPage from './Components/ShoppingCart';
import ShowCart from './Components/ShowCart/ShowCart';
import Indexsignupform from './Components/Login/indexsignupform';
import Indexloginform from './Components/Login/indexloginform';
import Searchpage from './Components/Search/Searchpage';
import Furniture from './Components/Furniture/Furniture';
import Fashion from './Components/Fashion/Fashion';
import Orderhistory from './Components/Orderhistory/index';
import Verifyemailindex from './Components/verifyemail/verifyemailindex'
import Category from './Components/Category/Category';

function App() {
  const routes = [
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: 'Product/:product_id', 
      element: <Cart />,
    },
    {
      path: 'Category/:subcategory', 
      element: <Category />,
    },
    {
      path: routesName.ShoppingCart,
      element: <ShoppingCartPage />,
    },
    {
      path: routesName.ShowCart,
      element: <ShowCart />,
    },
    {
      path: routesName.login,
      element: <Indexloginform />,
    },
    {
      path: routesName.signup,
      element: <Indexsignupform />,
    },
    {
      path: routesName.Searchpage,
      element: <Searchpage />,
    },
    {
      path: routesName.furniture,
      element: <Furniture />,
    },
    {
      path: routesName.fashion,
      element: <Fashion />,
    },
    {
      path: routesName.Orderhistory,
      element: <Orderhistory />,
    },
    {
      path: routesName.verifyemail,
      element: <Verifyemailindex />,
    },
  ];

  return (
    <>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;
