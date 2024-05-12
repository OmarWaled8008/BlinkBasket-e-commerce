import axios from "axios";
import { useQuery } from "react-query";
import "./products.css";
import { Triangle } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Products() {
  const [sendBtnValue, setSendBtnValue] = useState("All Shop");

  const productsData = useQuery("productsData", getAllProducts);
  async function getAllProducts() {
    return await axios.get(
      "https://route-ecommerce.onrender.com/api/v1/products"
    );
  }

  const categoriesData = useQuery("allcategories", getAllCategories);
  async function getAllCategories() {
    return await axios.get(
      "https://route-ecommerce.onrender.com/api/v1/categories"
    );
  }

  const handleCategoryChange = (category) => {
    setSendBtnValue(category);
  };

  if (productsData.isLoading || categoriesData.isLoading) {
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

  const categories = categoriesData.data?.data.data || [];
  const products = productsData.data?.data.data || [];
  const filteredProducts =
    sendBtnValue === "All Shop"
      ? products
      : products.filter((product) => product.category.name === sendBtnValue);

  return (
    <>
      <section className="introsection">
        <div className="introsection__title text-6xl text-c1">Our Products</div>
      </section>
      <section className="products row w-100 pb-3 px-0">
        <aside className="products__sidebar col-md-2">
          <div className="products__list pt-14">
            <div className="group mb-3 p-3">
              <FaSearch className="icon" />
              <input
                className="inputSearch"
                type="search"
                placeholder="Search"
              />
            </div>
            <ul className="ulside flex flex-col justify-between items-center p-3">
              <li className="block w-100">
                <button
                  className={`text-c1 text-lg font-medium transition-all duration-300 w-100 p-1 rounded-lg ${
                    sendBtnValue === "All Shop" ? "bg-c1 text-c5" : ""
                  }`}
                  onClick={() => handleCategoryChange("All Shop")}
                >
                  All shop
                </button>
              </li>
              {categories.map((category, idx) => (
                <li key={idx} className="block w-100">
                  <button
                    className={`text-c1 text-lg font-medium transition-all duration-300 w-100 p-1 rounded-lg ${
                      sendBtnValue === category.name ? "bg-c1 text-c5" : ""
                    }`}
                    onClick={() => handleCategoryChange(category.name)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="products__container col-md-10 row gy-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center w-100 h-100 flex justify-center items-center">
              <p className="alert alert-danger">
                No products available for this category.
              </p>
            </div>
          ) : (
            filteredProducts.map((product, idx) => (
              <div key={idx} className="product col-md-4">
                <Link to={`/prodectdetails`} className="product__con bg-c5 p-3 rounded-lg block">
                  <img src={product.imageCover} className="w-100" alt="" />
                  <h3 className="text-xl mb-2 text-c1">
                    {product.category.name}
                  </h3>
                  <h2 className="text-4xl font-medium mb-3">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  <div className="flex justify-between mb-4">
                    <p className="text-lg text-c1">
                      Price: <span className="text-c3">{product.price}</span>
                    </p>
                    <p className="text-lg text-c3">
                      {product.ratingsAverage}{" "}
                      <i className="fas fa-star text-yellow-400"></i>
                    </p>
                  </div>
                  <button className="btncta m-0 w-100">Add to cart</button>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
