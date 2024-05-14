import React, { useContext } from "react";
import paymentCSS from "./payment.module.css";
import { useFormik } from "formik";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { cartContext } from "../../context/cartallapis";

export default function Payment() {
  const { clearCart } = useContext(cartContext);
  const navigate = useNavigate();
  const { cartId } = useParams();
  let shippingAddress = {
    details: "",
    phone: "",
    city: "",
  };
  let formikObj = useFormik({
    initialValues: shippingAddress,
  });
  async function cashPayment(values) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      let res = data.status;
      clearCart();
      if (res === "success") {
        toast.success("we get your order");
        setTimeout(() => {
          navigate("/allorders");
        }, 2000);
      }
    } catch (error) {
      let errorres = error.response.data.message;
      toast.error(errorres);
    }
  }
  async function creditPayment(values) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?http://localhost:3000`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      let res = data.status;
      clearCart();
      if (res === "success") {
        toast.success(data.message);
        window.open(data.session.url, "_blank");
      }
    } catch (error) {
      let errorres = error.response.data.message;
      toast.error(errorres);
    }
  }
  return (
    <>
      <section className="introsection">
        <div className="introsection__title text-6xl text-c1">Payment</div>
      </section>
      <div className={`${paymentCSS.paymentcon} p-0 row`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="col-md-8 p-4 pt-5"
        >
          <h2
            className={`${paymentCSS.paymenttitle} text-center m-auto mb-5 text-2xl text-c1 pb-4 font-medium`}
          >
            Chash & credit payment
          </h2>
          <div
            className={`inputForm position-relative mb-4 ${
              formikObj.touched.details ? "touchedinput" : ""
            }`}
          >
            <MdOutlineAlternateEmail color="#21313c" size={"1.5rem"} />
            <input
              onBlur={formikObj.handleBlur}
              onChange={formikObj.handleChange}
              value={formikObj.values.details}
              name="details"
              type="text"
              className="input p-1 w-100"
              placeholder="Enter your details"
            />
          </div>
          <div
            className={`inputForm position-relative mb-4 ${
              formikObj.touched.phone ? "touchedinput" : ""
            }`}
          >
            <MdOutlineAlternateEmail color="#21313c" size={"1.5rem"} />
            <input
              onBlur={formikObj.handleBlur}
              onChange={formikObj.handleChange}
              value={formikObj.values.phone}
              name="phone"
              type="tel"
              className="input p-1 w-100"
              placeholder="Enter your phone"
            />
          </div>
          <div
            className={`inputForm position-relative mb-4 ${
              formikObj.touched.city ? "touchedinput" : ""
            }`}
          >
            <MdOutlineAlternateEmail color="#21313c" size={"1.5rem"} />
            <input
              onBlur={formikObj.handleBlur}
              onChange={formikObj.handleChange}
              value={formikObj.values.city}
              name="city"
              type="text"
              className="input p-1 w-100"
              placeholder="Enter your city"
            />
          </div>
          <div className="flex justify-between">
            {" "}
            <button
              onClick={() => {
                cashPayment(formikObj.values);
              }}
              type="button"
              className="btncta w-50 flex justify-center items-start"
              style={{ lineHeight: "2.3em" }}
            >
              Cash Payment
            </button>
            <button
              onClick={() => {
                creditPayment(formikObj.values);
              }}
              type="button"
              className="btncta w-50 flex justify-center items-start"
              style={{ lineHeight: "2.3em" }}
            >
              Credit Payment
            </button>
          </div>
        </form>
        <div className="col-md-4 p-0">
          <img src={require("../../images/payment.avif")} alt="" />
        </div>
      </div>
    </>
  );
}
