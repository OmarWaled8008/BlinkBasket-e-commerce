import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Cartsidebar from "../Cartsidebar/Cartsidebar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Cartsidebar />
      <Outlet />
      <Footer />
    </>
  );
}
