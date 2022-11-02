import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import MeetUsPage from "./pages/MeetUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import SocialMedia from "./components/SocialMedia";
import React from "react";
import Divider from "./components/Divider";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPH_SERVER,
});

const authLink = setContext((_, {headers}) => {
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
    cache: new InMemoryCache()
})

function App() {
  return (
      <ApolloProvider client={client}>

          <div className={'metpro-app'}>
              <Router>
                  <>
                      <NavigationBar/>
                      <Routes>
                          <Route
                              path={'/'}
                              element={<MainPage/>}
                          />
                          <Route
                              path={'/meet-us'}
                              element={<MeetUsPage/>}
                          />
                          <Route
                              path={'/contact-us'}
                              element={<ContactUsPage/>}
                          />
                          <Route
                              path={'/login'}
                              element={<LoginPage/>}
                          />
                          <Route
                              path={'/profile'}
                              element={<ProfilePage/>}
                          />
                      </Routes>
                      <SocialMedia/>
                      <Divider/>
                      <Footer/>
                  </>
              </Router>
          </div>
      </ApolloProvider>
  );
}

export default App;
