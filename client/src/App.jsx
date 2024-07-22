import './App.css';
import { Outlet } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
   } from '@apollo/client';
   import { setContext } from '@apollo/client/link/context';
// import Header from "./components/Header.jsx"
// import Footer from "./components/Footer.jsx"
// import Home from "./pages/Home.jsx"

const httpLink = createHttpLink({
    uri: '/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

const App = () => {
    return (
        <div>
            <ApolloProvider client={client}>
                <Outlet />
            </ApolloProvider>
        </div>
    );
}

export default App;
