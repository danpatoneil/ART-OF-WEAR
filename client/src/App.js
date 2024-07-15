import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Profile from './components/Profile';
import CreateProduct from './components/CreateProduct';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/products/:id" component={ProductDetails} />
          <Route path="/profile" component={Profile} />
          <Route path="/create-product" component={CreateProduct} />
          <Route path="/" component={ProductList} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;