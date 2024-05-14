import React from "react";
import ordersCSS from "./orders.module.css";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "react-query";
import axios from "axios";
import { Triangle } from "react-loader-spinner";

export default function Orders() {
  const userID = jwtDecode(localStorage.getItem("tkn"));
  const { data, isLoading } = useQuery("userOders", userOders);
  async function userOders() {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userID.id}`
      );
      return res.data;
    } catch (error) {
      let errorres = error.response.data.message;
      console.log(errorres);
    }
  }
  console.log(data);
  if (isLoading) {
    return (
      <div className="loadingscreen">
        <Triangle
          visible={true}
          height="150"
          width="150"
          color="#751fff"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
  return (
    <>
      <section className="introsection">
        <div className="introsection__title text-6xl text-c1">My orders</div>
      </section>
      <div className={`${ordersCSS.orderscon}  gy-4 row py-5`}>
        {data?.map((cart, idx) => (
          <div key={idx} className="col-md-4">
            <div className={`${ordersCSS.orderdetails} bg-c5 p-3 rounded-lg`}>
              <p className="mb-3">
                {" "}
                <span className="text-c1 text-xl mr-4">cart ID :</span>{" "}
                {cart.id}
              </p>
              <div className="flex w-100 justify-between mb-3 text-gray-400 ">
                <span className="inline-block">{cart.user.name}</span>
                <span className="inline-block mx-3">{cart.user.email}</span>
                <span className="inline-block">{cart.user.phone}</span>
              </div>
              <p className="mb-3">
                {" "}
                <span className="text-c1 text-xl mr-4">cart items :</span>{" "}
                {cart.cartItems.length}
              </p>
              <p className="mb-3">
                <span className="text-c1 text-xl mr-4">delivered :</span>{" "}
                {cart.isDelivered ? (
                  <i class="fas fa-check-square text-green-500"></i>
                ) : (
                  <i class="fas fa-window-close text-red-500"></i>
                )}
              </p>
              <p className="mb-3">
                <span className="text-c1 text-xl mr-4">paid :</span>{" "}
                {cart.isPaid ? (
                  <i class="fas fa-check-square text-green-500"></i>
                ) : (
                  <i class="fas fa-window-close text-red-500"></i>
                )}
              </p>
              <p className="mb-3">
                <span className="text-c1 text-xl mr-4">payment method :</span>{" "}
                {cart.paymentMethodType}
              </p>
              <p className="mb-3">
                <span className="text-c1 text-xl mr-4">
                  total order price :
                </span>{" "}
                {cart.totalOrderPrice} EGP
              </p>
              <p className="mb-3">
                <span className="text-c1 text-xl mr-4">shipping price :</span>{" "}
                {cart.totalOrderPrice}{" "}
                <span className="text-c1 text-xl mr-4">EGP</span>
              </p>
              <div className="w-100 mb-3">
                <span className="block">
                  <span className="text-c1 text-xl mr-4">details :</span>{" "}
                  {cart.shippingAddress.details}
                </span>
                <span className="block">
                  <span className="text-c1 text-xl mr-4">phone :</span>{" "}
                  {cart.shippingAddress.phone}
                </span>
                <span className="block">
                  <span className="text-c1 text-xl mr-4">city :</span>{" "}
                  {cart.shippingAddress.city}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
