import React from "react";
import { Button, Divider, FormLabel, Input } from "@mui/joy";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";

function Login() {
  const navigate = useNavigate();
  const [errormsg, seterrormsg] = useState("");
  const [submitbuttondesabled, setsubmitbuttondesabled] = useState(false);
  const [details, setdetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    if (!details.email || !details.password) {
      seterrormsg("Fill All Fields");
      return;
    }
    seterrormsg("");
    console.log(details);
    signInWithEmailAndPassword(auth, details.email, details.password)
      .then(async (res) => {
        navigate("/jobs");
        console.log(res);
      })
      .catch((err) => {
        console.log("Error", err);
        seterrormsg(err.message);
      });
  };

  // const [details, setDetails] = useState({
  //   email: "",
  //   password: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setDetails({
  //     ...details,
  //     [name]: value,
  //   });
  // };

  // async function handleSubmit(e) {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:5000/api/loginuser", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: details.email,
  //         password: details.password,
  //       }),
  //     });

  //     const json = await response.json();

  //     if (!json.success) {
  //       alert("Invalid Credentials");
  //     } else {
  //       localStorage.setItem("authToken", json.authToken);
  //       navigate("/");
  //       alert("Login Successful");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // const handleChange = (event) => {
  //   setdetails({ ...details, [event.target.name]: event.target.value });
  // };

  return (
    <div>
      <div className="container-fluid  ">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className=" " style={{ marginTop: "12%" }}>
              <div className="  rounded w-75 w-lg-50 align-items-center m-auto   my-3">
                <h3 className="text-start mb-2 font-weight-bold">
                  Welcome Back{" "}
                </h3>
                <p className="text-start mb-3 fs-13 text-dark font-weight-bold ">
                  The faster you fill up, the faster you get a ticket
                </p>

                <form onSubmit={handleSubmit}>
                  <FormLabel className="font-weight-bold">Email*</FormLabel>
                  <Input
                    placeholder="Enter your email"
                    variant="outlined"
                    name="email"
                    onChange={(event) =>
                      setdetails((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                  />

                  <div className="mb-3">
                    <FormLabel className="font-weight-bold">
                      Password*
                    </FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your password"
                      variant="outlined"
                      name="password"
                      onChange={(event) =>
                        setdetails((prev) => ({
                          ...prev,
                          password: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <p className="text-danger fw-bold">{errormsg}</p>
                  <Button
                    fullWidth
                    color="primary"
                    variant="solid"
                    className="mb-3"
                    disabled={submitbuttondesabled}
                    onClick={handleSubmit}
                    style={{ backgroundColor: "#f3693a" }}
                  >
                    Login
                  </Button>
                </form>

                <p className="text-center text-dark ">
                  Don't have an account?{" "}
                  <strong style={{ textDecoration: "underline" }}>
                    {" "}
                    <Link to="/register">Register</Link>
                  </strong>
                </p>
              </div>
            </div>
          </div>

          <div className="col p-0">
            <div className="w-100" style={{ overflow: "hidden" }}>
              <img
                className="w-100"
                src="https://images.unsplash.com/photo-1609405978461-63be963705b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1087&q=80"
                alt="logo"
                style={{
                  width: "100%",
                  marginTop: "-30%",
                  marginBottom: "-28%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Login;
