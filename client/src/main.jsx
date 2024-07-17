import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([{
    path: '/',
    element: <App />,
    errorElement: <div>Not Found</div>,
    children: [
        {
            index: true,
            element: <Home />
        }, {
            path: '/matchup',
            element: <Matchup />
          }, {
            path: '/matchup/:id',
            element: <Vote />
          }
    ]
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);