import React, { useState } from "react";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Homescreen from "./Screen/Homescreen";
import SearchScreen from "./Screen/searchScreen";
import "../src/_app.scss";
import Login from "./Screen/loginScreen/login";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import WatchScreen from "./Screen/watchScreen/WatchScreen";
import SubscriptionScreen from "./Screen/subscriptionScreen/subscriptionScreen";
import ChannelScreen from "./Screen/channelScreen/channelScreen";

const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);
  const handleToggleSidebar = () => toggleSidebar((value) => !value);

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <div className="app__main">{children}</div>
      </div>
    </>
  );
};

const App = () => {
  const { accessToken } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* ✅ Public Routes */}
      <Route
        path="/"
        element={
          <Layout>
            <Homescreen />
          </Layout>
        }
      />
      <Route
        path="/watch/:id"
        element={
          <Layout>
            <WatchScreen />
          </Layout>
        }
      />
      <Route
        path="/search/:query"
        element={
          <Layout>
            <SearchScreen />
          </Layout>
        }
      />
      <Route
        path="/channel/:channelId"
        element={
          <Layout>
            <ChannelScreen />
          </Layout>
        }
      />
      <Route path="/auth" element={<Login />} />

      {/* 🔒 Protected Routes */}
      <Route
        path="/feed/subscriptions"
        element={
          accessToken ? (
            <Layout>
              <SubscriptionScreen />
            </Layout>
          ) : (
            <Navigate to="/auth" />
          )
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
