// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter,HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Nav from "./components/Nav";
import Contact from "./components/Contact";
import Gallery from "./components/gallery";
import Login from "./components/Login";
// import Exptoas from "./components/toast";
import NotFound from "./components/404";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/profile";
import FallingShapes from "./components/Fallingshapes";


function App() {
  return (
    <>
      <BrowserRouter basename="/new">
        <Nav />
        {/* <FallingShapes/> */}
        {/* <ToastContainer position="top-center"/> */}
        <ToastContainer />
        <Routes>
          {/* <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route exact path="/about" element={<PrivateRoute><About /></PrivateRoute>} /> */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Contact" element={<Contact />} />
          <Route exact path="/Gallery" element={<Gallery />} />
          {/* <Route exact path="/Gallery" element={<PrivateRoute><Gallery/></PrivateRoute>} /> */}
          <Route exact path="/Login" element={<Login/>}/>
          <Route exact path="/Profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
          <Route exact path="*" element={<NotFound/>}/>
          {/* <Route exact path="/Toast" element={<Exptoas/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
