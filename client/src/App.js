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
import ClientNavBar from "./components/ClientNavBar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Quote from "./components/pages/Quote";
import AdminHome from "./components/pages/AdminHome";
import Gallery from "./components/pages/Gallery";
import Refer from "./components/pages/Refer";
import Reviews from "./components/pages/Reviews";
import CreateClientForm from "./components/forms/CreateClientForm";
import ClientLoginForm from "./components/forms/ClientLoginForm";
import Dashboard from "./components/pages/Dashboard";
import Scheduler from "./components/pages/Scheduler";
import Settings from "./components/pages/Settings";
import VerifyEmail from "./components/pages/VerifyEmail";
import ReferLoggedIn from "./components/pages/ReferLoggedIn";

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
        {Auth.loggedIn() ? <ClientNavBar /> : <NavBar />}

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/referral" element={<Refer />} />
            <Route path="/createAccount" element={<CreateClientForm />} />
            <Route path="/login" element={<ClientLoginForm />} />
            <Route path="/portal/dashboard" element={<Dashboard />} />
            <Route path="/portal/scheduler" element={<Scheduler />} />
            <Route path="/portal/settings" element={<Settings />} />
            <Route path="/portal/referral" element={<ReferLoggedIn />} />
            <Route
              path="/verifyEmail/:clientId/:emailToken"
              element={<VerifyEmail />}
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
