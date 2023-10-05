import { Button, Divider, FormLabel, Input } from "@mui/joy";
import React, { useState } from "react";
import { Link, redirect, useHref } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { createUserWithEmailAndPassword , updateProfile} from "firebase/auth";
import { auth } from "./firebase";
import { Details } from "@mui/icons-material";

function Register() {
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const [errormsg, seterrormsg] = useState("");
  const [submitbuttondesabled, setsubmitbuttondesabled] = useState(false);
  const [details, setdetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    if (!details.name || !details.email || !details.password) {
      seterrormsg("Fill All Fields");
      return;
    }
    seterrormsg("");
    console.log(details);
    createUserWithEmailAndPassword(auth, details.email, details.password)
      .then(async(res) => {
        const user = res.user;
        await updateProfile(user,{
          displayName:details.name,
        })
        navigate("/")
        console.log(res);
      })
      .catch((err) => {
        console.log("Error",err)
        seterrormsg(err.message);
      });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch("http://localhost:5000/api/newuser", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: details.name,
  //       email: details.email,
  //       password: details.password,
  //       location: details.geoloaction,
  //     }),
  //   });

  //   const json = await response.json();
  //   console.log(json);
  //   if (json.success) {
  //     // Registration was successful, navigate to the login page

  //     navigate("/login");
  //   } else {
  //     alert("Enter Valid Credentials");
  //   }
  // };
  // const handleChange = (event) => {
  //   setdetails({ ...details, [event.target.name]: event.target.value });
  // };

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

                <form
                // onSubmit={handleSubmit}
                >
                  <FormLabel className="font-weight-bold">Name*</FormLabel>
                  <Input
                    placeholder="Enter your Name"
                    variant="outlined"
                    color="white"
                    name="name"
                    className="border mb-3"
                    onChange={(event) =>
                      setdetails((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    // value={details.name}
                    // onChange={handleChange}
                    //   {...formik.getFieldProps("email")}
                  />
                  <FormLabel className="font-weight-bold">Email*</FormLabel>
                  <Input
                    placeholder="Enter your email"
                    variant="outlined"
                    color="white"
                    className="border mb-3"
                    name="email"
                    onChange={(event) =>
                      setdetails((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                    // value={details.email}
                    // onChange={handleChange}
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
                    onChange={(event) =>
                      setdetails((prev) => ({
                        ...prev,
                        password: event.target.value,
                      }))
                    }
                    // value={details.password}
                    // onChange={handleChange}
                    //   {...formik.getFieldProps("password")}
                  />
                  {/* {formik.touched.password && formik.errors.password ? (
                  <div className="error text-danger font-weight-bold mt-1">
                    {formik.errors.password}
                  </div>
                ) : null} */}
                  {/* <p className="mb-3 fs-14 text-dark font-weight-bold">
                    Must be at least 8 characters.
                  </p> */}
                  <p className="text-danger fw-bold">{errormsg}</p>
                  <Button
                    className="text-white mb-3 mt-2"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={submitbuttondesabled}
                    style={{ backgroundColor: "#0d6efd" }}
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
                src="https://img.freepik.com/free-photo/sign-up-register-online-internet-web-concept_53876-133557.jpg?w=740&t=st=1696543375~exp=1696543975~hmac=e0b25569643b71293ed1125f32350c4637b8015cedf734823023e3637171449a"
                alt="logo"
                style={{
                  width: "100%",
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
