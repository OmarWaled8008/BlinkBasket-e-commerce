import React, { useContext } from "react";
import ProductDetailsSlider from "../../components/ProductdetailsSlider/ProductdetailsSlider";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import productdetailsCSS from "./Productdetails.module.css";
import { Triangle } from "react-loader-spinner";
import { cartContext } from "../../context/cartallapis";
import toast from "react-hot-toast";
export default function Productdetails() {
  const { id } = useParams();
  const { addProductToCart } = useContext(cartContext);
  async function addToCart(id) {
    const data = await addProductToCart(id);
    if (data.status === "success") {
      toast.success("product added successfully");
    } else toast.error("there is a problem");
  }
  const { data } = useQuery("productsDataDetails", getAllProductsDetails);
  async function getAllProductsDetails() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }
  if (!data) {
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
        <div className="introsection__title text-6xl text-c1">
          {data.data.data.title.split(" ").slice(0, 3).join(" ")}
        </div>
      </section>
      <div
        className={`${productdetailsCSS.productdetails} row bg-c5 p-4 mt-4 mb-4 rounded-2xl`}
      >
        <div className="productdetails__con col-md-6">
          <div className="productdetails__div">
            <ProductDetailsSlider images={data.data.data.images} />
          </div>
        </div>
        <div className="productdetails__con col-md-6 pt-36">
          <div className="productdetails__div p-4">
            <h2 className="text-4xl font-medium mb-5">
              {data.data.data.title}
            </h2>
            <p className="text-lg text-c3 mb-1">
              {data.data.data.ratingsAverage}{" "}
              <i className="fas fa-star text-yellow-400"></i>
            </p>
            <h5 className="text-xl text-gray-400">
              {data.data.data.category.name}
            </h5>
            <p className="text-2xl text-c1 mb-5">EGP {data.data.data.price}</p>
            <p className="text-2xl text-c1 ">
              {data.data.data.brand.name} brand
            </p>
            <p className="text-xl mb-20">{data.data.data.description}</p>
            <button
              onClick={() => {
                addToCart(data.data.data.id);
              }}
              className="btncta m-0 w-100"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
