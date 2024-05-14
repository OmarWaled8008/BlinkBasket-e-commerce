import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export function CartProvider({ children }) {
  const [allCartProducts, setAllCartProducts] = useState(null);
  const [alltotalCartPrice, setTotalCartPrice] = useState(null);
  const [alltotalCartItems, setTotalCartItems] = useState(null);
  const [zerodisplay, setZerodisplay] = useState(null);
  const [cartId, setCartId] = useState(null);
  async function updateCartCount(id, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setAllCartProducts(data.data.products);
      setTotalCartPrice(data.data.totalCartPrice);
      setTotalCartItems(data.numOfCartItems);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function clearCart() {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setAllCartProducts(null);
      setTotalCartPrice(null);
      setTotalCartItems(null);
      setZerodisplay(data.message);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteProductFromCart(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setAllCartProducts(data.data.products);
      setTotalCartPrice(data.data.totalCartPrice);
      setTotalCartItems(data.numOfCartItems);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function addProductToCart(id) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: id },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      getCart();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function getCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setAllCartProducts(data.data.products);
      setTotalCartPrice(data.data.totalCartPrice);
      setTotalCartItems(data.numOfCartItems);
      setCartId(data.data._id);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCart();
    return () => {};
  }, []);

  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        allCartProducts,
        alltotalCartPrice,
        alltotalCartItems,
        deleteProductFromCart,
        updateCartCount,
        clearCart,
        setZerodisplay,
        zerodisplay,
        cartId,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
