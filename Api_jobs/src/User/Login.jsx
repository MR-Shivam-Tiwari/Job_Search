import React from "react";
import { Button, Divider, FormLabel, Input } from "@mui/joy";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("required*"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});
function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [details, setdetails] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: details.email,
        password: details.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/jobs");
      // toast.success("Login Successfully")
    }
  };

  const handleChange = (event) => {
    setdetails({ ...details, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="container-fluid  ">
        <div className="row">
          <div className="col p-0">
            <div className="w-100" style={{ overflow: "hidden" }}>
              <img
                className="w-100"
                src="https://images.unsplash.com/photo-1598257006408-538c27529235?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                alt="logo"
                style={{
                  width: "100%",
                  marginTop: "-20%",
                  marginBottom: "-40%",
                }}
              />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className=" " style={{ marginTop: "22%" }}>
              <div className="  rounded w-75 w-lg-50 align-items-center m-auto   my-3">
                <h3 className="text-start mb-2 font-weight-bold">
                  Welcome Back{" "}
                </h3>
                <p className="text-start mb-3 fs-13 text-dark font-weight-bold ">
                  The faster you fill up, the faster you get a ticke
                </p>

                <form onSubmit={handleSubmit}>
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
                  <div className="mb-3"></div>
                  <FormLabel className="font-weight-bold">Password*</FormLabel>
                  <Input
                    placeholder="Enter your password"
                    variant="outlined"
                    color="white"
                    className="border mb-3"
                    name="password"
                    value={details.password}
                    onChange={handleChange}
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
                  <div
                    className="d-flex align-items-center justify-content-end mb-2 font-weight-bold"
                    style={{ textDecoration: "underline" }}
                  >
                    <Link to="/auth/institute/recover">
                      {/* <p className="text-dark">Forgot Password?</p> */}
                    </Link>
                  </div>
                  {/* <p className='mb-4 fs-14 text-dark font-weight-bold'>Must be at least 8 characters.</p> */}
                  <Button
                    type="submit"
                    fullWidth
                    color="primary"
                    variant="solid"
                    className="mb-3"
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
        </div>
      </div>
    </div>
  );
}

export default Login;
