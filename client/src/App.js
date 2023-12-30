import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "./utils/auth";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Quote from "./components/pages/Quote";
import AdminHome from "./components/pages/AdminHome";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  const adminLoggedIn = localStorage.getItem("adminLoggedIn");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      adminLoggedIn: adminLoggedIn,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar />

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/admin" element={<AdminHome />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
