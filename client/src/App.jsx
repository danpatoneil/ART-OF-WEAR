import './App.css';
import { Outlet } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
   } from '@apollo/client';
   import { setContext } from '@apollo/client/link/context';
import Footer from "./components/Footer.jsx"
import Header from './components/Header.jsx';
import LoggedInHeader from './components/Headerhome.jsx';
import Auth from './utils/auth.js'

const httpLink = createHttpLink({
    uri: '/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    //get id token from sessionStorage
    const token = sessionStorage.getItem('id_token');
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
    const userLoggedIn = Auth.loggedIn()
    return (
        <div>
            <ApolloProvider client={client}>
                {userLoggedIn? (<LoggedInHeader />) : (<Header/>)}
                <Outlet />
                {/* <Footer /> */}
            </ApolloProvider>
        </div>
    );
}

export default App;
