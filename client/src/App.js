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
import AdminNavBar from "./components/pages/admin/AdminNavBar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import AdminHome from "./components/pages/admin/AdminNavBar";
import About from "./components/pages/About";
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
import PastTransactions from "./components/pages/PastTransactions";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import CookiePolicy from "./components/pages/CookiePolicy";
import Terms from "./components/pages/Terms";
import Inquiries from "./components/pages/admin/Inquiries";
import Scheduling from "./components/pages/admin/Scheduling";
import Billing from "./components/pages/admin/Billing";
import Clients from "./components/pages/admin/Clients";
import ClientProfile from "./components/pages/admin/ClientProfile";
import AdminSettings from "./components/pages/admin/AdminSettings";
import Services from "./components/pages/Services";
import Pay from "./components/pages/Pay";
import PaymentSuccess from "./components/pages/PaymentSuccess";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  const adminLoggedIn = localStorage.getItem("adminLoggedIn");
  const clientId = localStorage.getItem("clientId");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      adminLoggedIn: adminLoggedIn,
      clientId: clientId,
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
        <AdminNavBar />

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/about" element={<About />} />
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
              path="/portal/transactionHistory"
              element={<PastTransactions />}
            />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/cookiePolicy" element={<CookiePolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route
              path="/verifyEmail/:clientId/:emailToken"
              element={<VerifyEmail />}
            />
            <Route path="/admin/inquiries" element={<Inquiries />} />
            <Route path="/admin/scheduling" element={<Scheduling />} />
            <Route path="/admin/billing" element={<Billing />} />
            <Route path="/admin/clients" element={<Clients />} />
            <Route
              path="/admin/clients/:clientId"
              element={<ClientProfile />}
            />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/portal/pay" element={<Pay />} />
            <Route path="/portal/paymentSuccess" element={<PaymentSuccess />} />
            <Route path="/portal/pay/:invoiceId" element={<Pay />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
