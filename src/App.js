import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import Brands from "./pages/Brands/Brands";
import Cart from "./pages/Cart/Cart";
import { QueryClient, QueryClientProvider } from "react-query";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Notfound from "./pages/Notfound/Notfound";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/authentication";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Productdetails from "./pages/Productdetails/Productdetails";
import { CartProvider } from "./context/cartallapis";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Wishlist from "./pages/Wishlist/Wishlist";
import WishlistProvider from "./context/wishlistapi";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "Home",
        element: <Home />,
      },
      {
        path: "Products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "prodectdetails/:id",
        element: (
          <ProtectedRoute>
            <Productdetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "Wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "Categories",
        element: <Categories />,
      },
      {
        path: "Brands",
        element: <Brands />,
      },
      {
        path: "Cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "Payment/:cartId",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "Signup", element: <Signup /> },
  { path: "login", element: <Login /> },
  { path: "*", element: <Notfound /> },
]);
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <WishlistProvider>
              <RouterProvider router={router} />
            </WishlistProvider>
          </CartProvider>
        </QueryClientProvider>
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;
