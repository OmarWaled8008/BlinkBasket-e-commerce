import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

export const wishlisContext = createContext();

export default function WishlistProvider({ children }) {
  const [loveCount, setLoveCount] = useState(null);
  const [loveDetails, setLoveDetails] = useState(null);
  const { data, isLoading } = useQuery("getWishList", getWishList);
  async function getWishList() {
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: { token: localStorage.getItem("tkn") } }
      );
      setLoveCount(res.data.count);
      setLoveDetails(res.data.data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getWishList();
    return () => {};
  }, []);
  return (
    <wishlisContext.Provider
      value={{
        getWishList,
        setLoveCount,
        loveCount,
        loveDetails,
        data,
        isLoading,
      }}
    >
      {children}
    </wishlisContext.Provider>
  );
}
