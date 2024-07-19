import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import User from './pages/User.jsx'
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
        },  
        
      ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);