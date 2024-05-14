import React, { useContext } from "react";
import { wishlisContext } from "../../context/wishlistapi";
import "./Wishlist.css";
import toast from "react-hot-toast";
import { cartContext } from "../../context/cartallapis";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Wishlist() {
  const { loveDetails, getWishList } = useContext(wishlisContext);
  const { addProductToCart } = useContext(cartContext);
  async function addToCart(id) {
    const data = await addProductToCart(id);
    if (data.status === "success") {
      toast.success(data.message);
    } else toast.error("there is a problem");
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
      loveBtn.classList.replace("far", "fas");
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
  return (
    <>
      <section className="introsection">
        <div className="introsection__title text-6xl text-c1">my wish list</div>
      </section>
      <div className="wishlist py-5 gy-4 row">
        {loveDetails.map((product, idx) => (
          <div key={idx} className=" col-md-4">
            <Link
              to={`/prodectdetails/${product.id}`}
              className=" bg-c5 p-3 rounded-lg block mb-2"
            >
              <img src={product.imageCover} alt="" />
              <h3 className="text-xl mb-2 text-c1">{product.category.name}</h3>
              <h2 className="text-3xl font-medium mb-3">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h2>
              <div className="flex justify-between mb-4">
                <p className="text-lg text-c1">
                  Price: <span className="text-c3">{product.price} EGP</span>
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
                  removeFromWishList(product.id, event);
                }}
                className="text-c1 text-2xl inline-block"
              >
                <i id="lovebtn" className="fas fa-heart"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
