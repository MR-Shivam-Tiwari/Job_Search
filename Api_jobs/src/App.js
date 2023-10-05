import React from "react"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; 

import Home from "./Components/Home";
import Login from "./User/Login";
import Register from "./User/Register";
import JobDetails from "./Components/JobDetails ";
import ApplicationSuccess from "./Components/ApplyJobSuccess";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Jobs" element={<Home />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<ApplicationSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
