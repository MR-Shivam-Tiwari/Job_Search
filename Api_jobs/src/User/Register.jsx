import { Button, Divider, FormLabel, Input } from "@mui/joy";
import React, { useState } from "react";
import { Link, redirect, useHref } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
// import { toast } from "react-hot-toast";
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

function Register() {
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [details, setdetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!details) {
      console.error("Details object is not defined.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/newuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: details.name,
          email: details.email,
          password: details.password,
        }),
      });

      if (response.status === 409) {
        console.error("User is already registered.");
      } else if (response.ok) {
        const json = await response.json();
        console.log(json);
        navigate("/");
      } else {
        const errorResponse = await response.json();
        console.error("Registration failed:", errorResponse.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleChange = (event) => {
    setdetails({ ...details, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="container-fluid  ">
        <div className="row" hidden={state}>
          <div className="col-12 col-lg-6">
            <div className=" " style={{ marginTop: "12%" }}>
              <div
                className="rounded w-75 w-lg-50  align-items-center m-auto p-1 my-3"
                style={{}}
              >
                <h3 className="text-start mb-2 font-weight-bold">
                  Create account
                </h3>
                <p className="text-start mb-3 fs-13 text-dark font-weight-bold ">
                  Start your 30-day free trial. Cancel anytime.
                </p>

                <form onSubmit={handleSubmit}>
                  <FormLabel className="font-weight-bold">Name*</FormLabel>
                  <Input
                    placeholder="Enter your Name"
                    variant="outlined"
                    color="white"
                    name="name"
                    className="border mb-3"
                    value={details.name}
                    onChange={handleChange}
                    //   {...formik.getFieldProps("email")}
                  />
                  <FormLabel className="font-weight-bold">Email*</FormLabel>
                  <Input
                    placeholder="Enter your email"
                    variant="outlined"
                    color="white"
                    className="border mb-3"
                    name="email"
                    value={details.email}
                    onChange={handleChange}
                    //   {...formik.getFieldProps("email")}
                  />
                  {/* {formik.touched.email && formik.errors.email ? (
                  <div className="error text-danger font-weight-bold mt-1">
                    {formik.errors.email}
                  </div>
                ) : null} */}

                  <FormLabel className="font-weight-bold">Password*</FormLabel>
                  <Input
                    // type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    variant="outlined"
                    color="white"
                    className="border mb-3"
                    name="password"
                    value={details.password}
                    onChange={handleChange}
                    //   {...formik.getFieldProps("password")}
                    endDecorator={
                      <i
                        className={`bi ${
                          showPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                        onClick={() => setShowPassword(!showPassword)}
                      ></i>
                    }
                  />
                  {/* {formik.touched.password && formik.errors.password ? (
                  <div className="error text-danger font-weight-bold mt-1">
                    {formik.errors.password}
                  </div>
                ) : null} */}
                  {/* <p className="mb-3 fs-14 text-dark font-weight-bold">
                    Must be at least 8 characters.
                  </p> */}

                  <Button
                    type="submit"
                    className="text-white mb-3 mt-2"
                    // color="primary"
                    fullWidth
                    style={{ backgroundColor: "#258aff" }}
                  >
                    Create Account
                  </Button>
                </form>
                <p className="text-center text-dark ">
                  Already have an account?{" "}
                  <strong style={{ textDecoration: "underline" }}>
                    <Link to="/">Log in</Link>
                  </strong>
                </p>
              </div>
            </div>
          </div>
          <div className="col p-0">
            <div className="w-100" style={{ overflow: "hidden" }}>
              <img
                className="w-100"
                src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1696424326~exp=1696424926~hmac=6c31d4c1a1c88f481aea731d6b5c127fddb67080f248397bbf01f0887458db81"
                alt="logo"
                style={{
                  width: "100%",
                  // marginTop: "-30%",
                  // marginBottom: "-28%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
