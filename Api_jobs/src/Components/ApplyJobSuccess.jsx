// ApplicationSuccess.jsx
import React from "react";
import { useLocation } from "react-router-dom";

function ApplicationSuccess() {
  const location = useLocation();
  const { formData } = location.state || {};

  return (
    <div className="container-fluid p-2 d-flex align-items-center justify-content-center">
      <div
        className="card p-3 text-center mt-2"
        style={{ width: "70%", backgroundColor: "rgb(153 254 203)" }}
      >
        <div className="p-2">
          <h1>Application Successful</h1>
          <p>Your application details:</p>
          <div className="  text-start">
            <p>Name: {formData?.name}</p>
            <p>Email: {formData?.email}</p>
            <p>Cover Letter: {formData?.coverLetter}</p>
            <p>Resume: {formData?.resume}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationSuccess;
