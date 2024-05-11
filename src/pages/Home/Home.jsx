import React from "react";
import Slidercomp from "../../components/Slidercomp/Slidercomp";
import homeCSS from "./home.module.css";
import wv1 from "../../images/mv1.webp";
import wv2 from "../../images/mv2.webp";
import "../../images/endesc.jpeg";
import { useQuery } from "react-query";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import { ThreeDCardDemo } from "../../components/ThreeDCardDemo/ThreeDCardDemo.tsx";
import { Triangle } from "react-loader-spinner";

export default function Home() {
  const { data, isLoading: homeIsLoading } = useQuery(
    "getCategoriesHome",
    getCategoriesApi
  );
  function getCategoriesApi() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  return (
    <>
      {homeIsLoading ? (
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
      ) : (
        <>
          <Slidercomp />
          <section className={`${homeCSS.secoundsection} w-100`}>
            <div className={homeCSS.secoundsection__con}>
              <div className={homeCSS.secoundsection__details}>
                <img
                  className={homeCSS.secoundsection__img}
                  src={wv1}
                  alt="wv1"
                />
                <div className={homeCSS.secoundsection__div}>
                  <p className="text-white text-2xl">Holiday Deals</p>
                  <h2>Up to 30% off</h2>
                  <p className="text-white text-xl mb-3">
                    Selected Smartphone Brands{" "}
                  </p>
                  <button className="btncta m-0">shop now</button>
                </div>
              </div>
              <div className={homeCSS.secoundsection__details}>
                <img
                  className={homeCSS.secoundsection__img}
                  src={wv2}
                  alt="wv2"
                />
                <div className={homeCSS.secoundsection__div}>
                  <p className="text-white text-2xl">just in</p>
                  <h2>takw your sound anywhere</h2>
                  <p className="text-white text-xl mb-3">
                    Selected Smartphone Brands{" "}
                  </p>
                  <button className="btncta m-0">shop now</button>
                </div>
              </div>
            </div>
          </section>
          <section className="w-100 bg-c5">
            <div className={`${homeCSS.appros}`}>
              <div className={`${homeCSS.appros__card} text-c3 bg-c4`}>
                <div className="flex">
                  <span className="block text-c1 me-3 text-2xl">
                    <i className="fa-solid fa-certificate"></i>
                  </span>
                  <div>
                    <h3 className="fw-bold text-xl">Certified Organic</h3>
                    <p>100% Guarantee</p>
                  </div>
                </div>
              </div>
              <div className="appros__card text-c3 bg-c4">
                <div className="flex">
                  <span className="block text-c1 me-3 text-2xl">
                    <i className="fa-solid fa-money-bill-wave"></i>
                  </span>
                  <div>
                    <h3 className="fw-bold text-xl">Huge Savings</h3>
                    <p>At Lowest Price</p>
                  </div>
                </div>
              </div>
              <div className="appros__card text-c3 bg-c4">
                <div className="flex">
                  <span className="block text-c1 me-3 text-2xl">
                    <i className="fa-solid fa-recycle"></i>
                  </span>
                  <div>
                    <h3 className="fw-bold text-xl">Easy Returns</h3>
                    <p>No Questions Asked</p>
                  </div>
                </div>
              </div>
              <div className="appros__card text-c3 bg-c4">
                <div className="flex">
                  <span className="block text-c1 me-3 text-2xl">
                    <i className="fa-solid fa-truck"></i>
                  </span>
                  <div>
                    <h3 className="fw-bold text-xl">Free Shipping</h3>
                    <p>Above $5 Only</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={`${homeCSS.categories} p-0`}>
            <h3 className={homeCSS.categories__title}>Our categories</h3>
            <OwlCarousel
              className="owl-theme"
              items={2}
              center={true}
              loop
              margin={10}
              dots
              autoplay={true}
            >
              {data?.data.data.map((category, idx) => {
                return (
                  <div className="item" key={idx}>
                    <ThreeDCardDemo
                      catename={category.name}
                      cateimg={category.image}
                    />
                  </div>
                );
              })}
            </OwlCarousel>
          </section>
          <section className={homeCSS.endsection}>
            <div className={homeCSS.endsection__con}>
              <div className={homeCSS.endsection__div}></div>
              <div className={homeCSS.endsection__details}>
                <span className="bg-red-700 w-50 text-center p-1 text-c5 text-2xl mb-4 block">
                  Today's Special
                </span>
                <p className="font-medium text-c3 text-4xl mb-3">
                  Best Arial View in Town
                </p>
                <h2 className="font-bold text-c3 text-8xl mb-4">
                  <span className="text-c1">30%</span> OFF
                </h2>
                <h3 className="font-bold text-c3 text-3xl mb-4">
                  on professional salary
                </h3>
                <p className="mb-5 text-gray-500">
                  Limited quantities.
                  <br />
                  See product detail pages for availability.
                </p>
                <button className="btncta m-0">shop</button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
