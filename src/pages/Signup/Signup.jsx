import React, { useState } from "react";
import "./signup.css";
import logo from "../../images/logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoPhonePortrait } from "react-icons/io5";
import { TbPasswordUser } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { Bars, Triangle } from "react-loader-spinner";
import toast from "react-hot-toast";

export default function Signup() {
  let userSign = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const [success, setSuccess] = useState(null);
  const [fail, setFail] = useState(null);
  const [loadSpinner, setLoadSpinner] = useState(false);
  const navigate = useNavigate();
  let formikObj = useFormik({
    initialValues: userSign,
    onSubmit: (values) => {
      signUpApi(values);
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    },
    validate: (values) => {
      setSuccess(null);
      setFail(null);
      let errors = {};
      const nameRegex = /^[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/;
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      const phoneNumberRegex = /^(\+[1-9]{1}[0-9]{3,14})?([0-9]{11,14})$/;

      if (!values.name || nameRegex.test(values.name) === false) {
        errors.name = "This is not a valid name";
      }
      if (!values.email || emailRegex.test(values.email) === false) {
        errors.email = "This is not a valid email address";
      }
      if (
        !values.phone ||
        phoneNumberRegex.test(values.phone) === false ||
        values.phone < 11
      ) {
        errors.phone =
          "This is not a valid phone number, check the number again";
      }
      if (!values.password || passwordRegex.test(values.password) === false) {
        errors.password = "This is not a valid password";
      }
      if (!values.rePassword || values.rePassword !== values.password) {
        errors.rePassword = "Confirm password does not match";
      }
      return errors;
    },
  });

  async function signUpApi(values) {
    setLoadSpinner(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      let res = data.message;
      if (res === "success") {
        setSuccess("You have been logged in successfully");
        toast.success("You have been logged in successfully");
      }
    } catch (error) {
      let errorres = error.response.data.message;
      setFail(errorres);
      toast.error(errorres);
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
        <div className="flex-column text-c2">
          <label>Name </label>
        </div>
        <div
          className={`inputForm position-relative ${
            formikObj.errors.name && formikObj.touched.name ? "errorinput" : ""
          }`}
        >
          <FaUser color="#21313c" size={"1.5rem"} />
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.name}
            name="name"
            type="text"
            className="input p-1"
            placeholder="Enter your Name"
          />
          {!formikObj.touched.name ? (
            ""
          ) : formikObj.errors.name && formikObj.touched.name ? (
            <i className="failicon position-absolute fa-solid fa-circle-xmark"></i>
          ) : (
            <i className="validicon position-absolute fa-solid fa-circle-check"></i>
          )}
        </div>
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
        <div className="flex-column text-c3 font-medium">
          <label>Phone </label>
        </div>
        <div
          className={`inputForm position-relative ${
            formikObj.errors.phone && formikObj.touched.phone
              ? "errorinput"
              : ""
          }`}
        >
          <IoPhonePortrait color="#21313c" size={"1.5rem"} />
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.phone}
            name="phone"
            type="text"
            className="input p-1"
            placeholder="Enter your Phone"
          />
          {!formikObj.touched.phone ? (
            ""
          ) : formikObj.errors.phone && formikObj.touched.phone ? (
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
        <div className="flex-column text-c3">
          <label>Confrim Password</label>
        </div>
        <div
          className={`inputForm position-relative ${
            formikObj.errors.rePassword && formikObj.touched.rePassword
              ? "errorinput"
              : ""
          }`}
        >
          <TbPasswordUser color="#21313c" size={"1.5rem"} />
          <input
            name="rePassword"
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.rePassword}
            type="password"
            className="input p-1"
            placeholder="Confirm your Password"
          />
          {!formikObj.touched.rePassword ? (
            ""
          ) : formikObj.errors.rePassword && formikObj.touched.rePassword ? (
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
            "Sign Up"
          )}
        </button>

        <p className="text-c3 text-center">
          already have an accout?
          <Link to="/login" className="span">
            Log In
          </Link>
        </p>
        <p className="text-c3 text-center">Or With</p>

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
