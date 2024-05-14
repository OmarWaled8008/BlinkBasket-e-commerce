import React, { useContext, useState } from "react";
import cartCSS from "./cart.module.css";
import toast from "react-hot-toast";
import { cartContext } from "../../context/cartallapis";
import { Link } from "react-router-dom";

export default function Cart() {
  const [promo, setPromo] = useState(true);
  const {
    alltotalCartPrice,
    alltotalCartItems,
    allCartProducts,
    deleteProductFromCart,
    updateCartCount,
    clearCart,
    cartId,
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
  }
  async function clear() {
    const res = await clearCart();
    if (res.message === "success") {
      toast.success("products cleared successfully");
    } else toast.error("there is a problem");
  }
  function hideShowPromo() {
    const inputGroup = document.getElementById("inputgroup");
    if (promo) {
      inputGroup.classList.replace("d-none", "d-block");
      setPromo(false);
    } else {
      inputGroup.classList.replace("d-block", "d-none");
      setPromo(true);
    }
  }

  return (
    <>
      <section className="introsection">
        <div className="introsection__title text-6xl text-c1">My Cart</div>
      </section>
      <div className={`${cartCSS.productscartcon} p-4 pt-10 row`}>
        <div className={`col-md-8`}>
          <h2
            className={`${cartCSS.productscarttitle} font-medium text-c1 text-xl w-100 pb-3 mb-5`}
          >
            my cart
          </h2>
          <div className={`p-0 flex flex-col`}>
            {allCartProducts === null || allCartProducts.length === 0 ? (
              <div className="text-center w-100 flex justify-center items-center">
                <img
                  src={require("../../images/emptycart.png")}
                  className="w-100"
                  alt=""
                />
              </div>
            ) : (
              allCartProducts?.map((product, idx) => {
                return (
                  <div
                    key={idx}
                    className={`${cartCSS.cartproductdetails} p-2 mb-3 bg-c5 rounded-md`}
                  >
                    <div className="productsconcart__details flex">
                      <img
                        src={product.product.imageCover}
                        className="w-28 block"
                        alt=""
                      />
                      <div className="p-2 w-100">
                        <h5 className="text-xl mb-2">
                          {product.product.title}
                        </h5>
                        <div className="flex justify-between w-100 mb-2">
                          <h2 className="text-2xl mb-1 text-c1">
                            EGP {product.price}
                          </h2>
                          <button
                            onClick={function () {
                              deleteProduct(product.product.id);
                            }}
                            className="block text-c1 hover:text-c3 transition-all"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>

                        <div className="mb-2">
                          <button
                            onClick={() => {
                              updateProduct(
                                product.product.id,
                                product.count + 1
                              );
                            }}
                            className="mr-2 font-medium w-7 bg-c1 text-c5 rounded-lg hover:bg-c3 transition-all"
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                          <span>{product.count}</span>
                          <button
                            onClick={() => {
                              updateProduct(
                                product.product.id,
                                product.count - 1
                              );
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
              })
            )}
          </div>
          <div className={`${cartCSS.productscartform} pt-4`}>
            <button onClick={hideShowPromo} className="promobtn block mb-3">
              <i className="fas fa-tags ml-2"></i> Enter a promo code
            </button>
            <div id="inputgroup" className={`${cartCSS.inputgroup} d-none`}>
              <input
                type="email"
                className={`${cartCSS.input}`}
                id="Email"
                name="Email"
                placeholder="Enter a promo code"
                autoComplete="off"
              />
              <input
                className={`${cartCSS.buttonsubmit}`}
                value="Apply"
                type="submit"
              />
            </div>
          </div>
        </div>

        <div className={`col-md-4`}>
          <h2
            className={`${cartCSS.productscarttitle} font-medium text-c1 text-xl w-100 pb-3 mb-5`}
          >
            order summary
          </h2>
          <div className={``}>
            <div className="w-100 flex justify-between mb-4">
              <h2 className="text-c1 text-2xl font-medium">Total Price</h2>
              <h2 className=" text-2xl font-medium">
                EGP {alltotalCartPrice || "0"}
              </h2>
            </div>
            <div className="w-100 flex justify-between mb-5">
              <h2 className="text-c1 text-2xl font-medium">Items</h2>
              <h2 className="text-2xl font-medium">
                {alltotalCartItems || "0"}
              </h2>
            </div>
          </div>
          <div className={`${cartCSS.productscartcheckout} pt-4`}>
            <button
              onClick={clear}
              className="btncta block w-100 text-center"
              style={{ lineHeight: "2.3em" }}
            >
              Clear Cart
            </button>
            <Link
              to={`/Payment/${cartId}`}
              className="btncta block w-100 text-center"
              style={{ lineHeight: "2.3em" }}
            >
              Check Out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
