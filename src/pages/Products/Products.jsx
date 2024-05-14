import axios from "axios";
import { useQuery } from "react-query";
import "./products.css";
import { Triangle } from "react-loader-spinner";
import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/cartallapis";
import toast from "react-hot-toast";
import { wishlisContext } from './../../context/wishlistapi';

export default function Products() {
  const [sendBtnValue, setSendBtnValue] = useState("All Shop");
  const [searchInput, setSearchInput] = useState("");
  const { getWishList } = useContext(wishlisContext);

  const [love, setLove] = useState(true);
  const { addProductToCart } = useContext(cartContext);
  async function addToCart(id) {
    const data = await addProductToCart(id);
    if (data.status === "success") {
      toast.success(data.message);
    } else toast.error("there is a problem");
  }
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

  async function addToWishList(id, event) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      const loveBtn = event.target;
      loveBtn.classList.replace("far", "fas");
      getWishList();
      if (data.status === "success") {
        toast.success(data.message);
      }
    } catch (error) {
      let errorres = error.response.data.message;
      toast.error(errorres);
    }
  }
  async function removeFromWishList(id, event) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,

        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      const loveBtn = event.target;
      loveBtn.classList.replace("fas", "far");
      getWishList();
      if (data.status === "success") {
        toast.success(data.message);
      }
      console.log(data);
    } catch (error) {
      let errorres = error.response.data.message;
      toast.error(errorres);
      console.log(error);
    }
  }
  function toggleLoveItem(id, event) {
    if (love) {
      addToWishList(id, event);
      setLove(false);
    } else {
      removeFromWishList(id, event);
      setLove(true);
    }
  }
  const handleCategoryChange = (category) => {
    setSendBtnValue(category);
  };
  const handleCategorySearch = () => {
    const inputSearch = document.getElementById("inputsearch");
    setSearchInput(inputSearch.value);
  };

  const categories = categoriesData.data?.data.data || [];
  const products = productsData.data?.data.data || [];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      sendBtnValue === "All Shop" || product.category.name === sendBtnValue;
    const matchesSearchInput = product.title
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    return matchesCategory && matchesSearchInput;
  });

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

  return (
    <>
      <section className="introsection">
        <div className="introsection__title text-6xl text-c1">Our Products</div>
      </section>
      <section className="products row pb-5 px-0">
        <aside className="products__sidebar col-md-2">
          <div className="products__list pt-14">
            <div className="group mb-3 p-3">
              <FaSearch className="icon" />
              <input
                id="inputsearch"
                onKeyUp={() => {
                  handleCategorySearch();
                }}
                className="inputSearch"
                type="search"
                placeholder="Search"
              />
            </div>
            <ul className="ulside flex flex-col justify-between items-center p-3">
              <li className="block w-100">
                <button
                  className={`text-c1 text-lg font-medium transition-all duration-300 w-100 p-1 rounded-lg hover:text-c5 hover:bg-c1 ${
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
                    className={`text-c1 text-lg font-medium transition-all duration-300 w-100 p-1 rounded-lg hover:text-c5 hover:bg-c1 ${
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
                <Link
                  to={`/prodectdetails/${product.id}`}
                  className="product__con bg-c5 p-3 rounded-lg block mb-2"
                >
                  <img src={product.imageCover} alt="" />
                  <h3 className="text-xl mb-2 text-c1">
                    {product.category.name}
                  </h3>
                  <h2 className="text-3xl font-medium mb-3">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  <div className="flex justify-between mb-4">
                    <p className="text-lg text-c1">
                      Price:{" "}
                      <span className="text-c3">{product.price} EGP</span>
                    </p>
                    <p className="text-lg text-c3">
                      {product.ratingsAverage}{" "}
                      <i className="fas fa-star text-yellow-400"></i>
                    </p>
                  </div>
                </Link>
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      addToCart(product.id);
                    }}
                    className="btncta m-0 w-75 inline-block"
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={(event) => {
                      toggleLoveItem(product.id, event);
                    }}
                    className="text-c1 text-2xl inline-block"
                  >
                    <i id="lovebtn" className="far fa-heart"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
