import React, { useContext } from "react";
import "./cartsidebar.css";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/cartallapis";
import toast from "react-hot-toast";
export default function Cartsidebar() {
  function cartSideBarHide() {
    const cartSideBar = document.getElementById("cartsidebar");
    cartSideBar.classList.replace("showcartsidebar", "hidecartsidebar");
  }
  const {
    alltotalCartPrice,
    alltotalCartItems,
    allCartProducts,
    deleteProductFromCart,
    updateCartCount,
    zerodisplay,
  } = useContext(cartContext);
  async function deleteProduct(id) {
    const res = await deleteProductFromCart(id);
    if (res.status === "success") {
      toast.success("product removed successfully");
    } else toast.error("there is a problem");
  }
  async function updateProduct(id, count) {
    const res = await updateCartCount(id, count);
    if (res.status === "success") {
      toast.success("product updated successfully");
    } else toast.error("there is a problem");
    console.log("update", res);
  }
  return (
    <div
      id="cartsidebar"
      className="cartsidebar hidecartsidebar bg-c5 fixed bottom-0 w-96 z-40"
    >
      <div className="w-100 bg-c2 p-2">
        <div className="flex justify-between items-center mb-3 p-1">
          <button onClick={cartSideBarHide} className="block">
            <i className="fas fa-chevron-right text-2xl text-c1 hover:text-c3 transition-all"></i>{" "}
          </button>
          <span className="block text-c3 text-2xl font-medium">my Cart</span>
        </div>
        <p className="text-xl text-c1 mb-3">
          Total Price :{" "}
          <span className="text-c3 font-medium">
            {alltotalCartPrice || "0"} EGP
          </span>
        </p>
        <p className="text-xl text-c1 mb-3">
          cart items :{" "}
          <span className="text-c3 font-medium">
            {alltotalCartItems || "0"}
          </span>
        </p>
        <Link
          to="/Cart"
          className="btncta text-center w-100 inline-block p-2 m-0"
        >
          view cart
        </Link>
      </div>
      <div className="productsconcart flex flex-col">
        {allCartProducts?.map((product, idx) => {
          return (
            <div key={idx} className="p-2 mb-1">
              <div className="productsconcart__details flex">
                <img
                  src={product.product.imageCover}
                  className="w-28 block"
                  alt=""
                />
                <div className="p-2 w-100">
                  <h5 className="text-xl">
                    {product.product.title.split(" ").slice(0, 2).join(" ")}
                  </h5>
                  <div className="flex justify-between w-100">
                    <h2 className="text-2xl mb-1 text-c1">$ {product.price}</h2>
                    <button
                      onClick={function () {
                        deleteProduct(product.product.id);
                      }}
                      className="block text-c1 hover:text-c3 transition-all"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        updateProduct(product.product.id, product.count + 1);
                      }}
                      className="mr-2 font-medium w-7 bg-c1 text-c5 rounded-lg hover:bg-c3 transition-all"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                    <span>{product.count}</span>
                    <button
                      onClick={() => {
                        updateProduct(product.product.id, product.count - 1);
                      }}
                      className="ml-2 font-medium w-7 bg-c1 text-c5 rounded-lg hover:bg-c3 transition-all"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
