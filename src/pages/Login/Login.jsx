import React, { useContext, useState } from "react";
import "./login.css";
import logo from "../../images/logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { authContext } from "../../context/authentication";
import toast from "react-hot-toast";
export default function Login() {
  const { setToken } = useContext(authContext);
  let userLog = {
    email: "",
    password: "",
  };
  const [success, setSuccess] = useState(null);
  const [fail, setFail] = useState(null);
  const [loadSpinner, setLoadSpinner] = useState(false);
  const navigate = useNavigate();
  let formikObj = useFormik({
    initialValues: userLog,
    onSubmit: (values) => {
      logInApi(values);
    },
    validate: (values) => {
      setSuccess(null);
      setFail(null);
      let errors = {};
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (!values.email || emailRegex.test(values.email) === false) {
        errors.email = "This is not a valid email address";
      }
      if (!values.password || passwordRegex.test(values.password) === false) {
        errors.password = "This is not a valid password";
      }
      return errors;
    },
  });
  async function logInApi(values) {
    setLoadSpinner(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      let res = data.message;
      localStorage.setItem("tkn", data.token);
      setToken(data.token);
      if (res === "success") {
        setSuccess("You have been logged in successfully");
        toast.success(data.message);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      let errorres = error.response.data.message;
      toast.error(errorres);
      setFail(errorres);
    }
    setLoadSpinner(false);
  }
  return (
    <>
      <form
        className="form position-relative"
        onSubmit={formikObj.handleSubmit}
      >
        <Link
          to="/home"
          className="block position-absolute bg-c1 text-c5 rounded-lg text-xl hover:bg-c3 transition-all p-2 w-16 text-center"
        >
          <i className="fas fa-arrow-left"></i>
        </Link>
        <img className="w-50 m-auto mb-10" src={logo} alt="" />
        <p className="mx-auto text-c3 mb-10">
          Join us and start your amazing journey today!
        </p>

        <div className="flex-column text-c3">
          <label>Email </label>
        </div>
        <div
          className={`inputForm position-relative ${
            formikObj.errors.email && formikObj.touched.email
              ? "errorinput"
              : ""
          }`}
        >
          <MdOutlineAlternateEmail color="#21313c" size={"1.5rem"} />
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.email}
            name="email"
            type="email"
            className="input p-1"
            placeholder="Enter your Email"
          />
          {!formikObj.touched.email ? (
            ""
          ) : formikObj.errors.email && formikObj.touched.email ? (
            <i className="failicon position-absolute fa-solid fa-circle-xmark"></i>
          ) : (
            <i className="validicon position-absolute fa-solid fa-circle-check"></i>
          )}
        </div>

        <div className="flex-column text-c3">
          <label>Password </label>
        </div>
        <div
          className={`inputForm position-relative ${
            formikObj.errors.password && formikObj.touched.password
              ? "errorinput"
              : ""
          }`}
        >
          <TbPasswordUser color="#21313c" size={"1.5rem"} />
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.password}
            name="password"
            type="password"
            className="input p-1"
            placeholder="Enter your Password"
          />
          {!formikObj.touched.password ? (
            ""
          ) : formikObj.errors.password && formikObj.touched.password ? (
            <i className="failicon position-absolute fa-solid fa-circle-xmark"></i>
          ) : (
            <i className="validicon position-absolute fa-solid fa-circle-check"></i>
          )}
        </div>

        {/* {success ? <div className="alert alert-success">{success}</div> : ""}
        {fail ? <div className="alert alert-danger">{fail}</div> : ""} */}

        <button
          type="submit"
          className="btncta w-100 flex justify-center items-start"
          style={{ lineHeight: "2.3em" }}
        >
          {loadSpinner ? (
            <Bars
              height="50"
              width="50"
              color="#ffffff"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            "Log In"
          )}
        </button>

        <p className="text-center text-c3">
          Don't have an account?
          <Link to="/signup" className="span">
            Sign Up
          </Link>
        </p>
        <p className="text-center text-c3">Or With</p>

        <div className="flex-row">
          <button className="btn google">
            <FcGoogle size={"2rem"} />
            Google
          </button>
          <button className="btn apple">
            <FaApple color="#21313c" size={"2rem"} />
            Apple
          </button>
        </div>
      </form>
    </>
  );
}
// hm123@gmail.com
