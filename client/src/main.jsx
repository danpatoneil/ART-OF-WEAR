import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/SignUp/Register.jsx';
import Upload from './pages/Upload.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Shirts from './pages/Shirts/Shirts.jsx';
import Success from './pages/Success/Success.jsx';
// import OrderHistory from
// import User from './pages/User.jsx'
const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
    //   errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />
        }, {
          path: '/login',
          element: <Login />
        }, {
          path: '/Register',
          element: <Register />
        }, {
            path: '/Upload',
            element: <Upload />
          },{
            path: '/Shirts/:id',
            element: <Shirts />
          },{
            path: '/Cart',
            element: <Cart />
          },{
            path: '/Success',
            element: <Success />
          },
      ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);
