import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../context/authentication";
import { cartContext } from "../../context/cartallapis";
import { wishlisContext } from "../../context/wishlistapi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const { alltotalCartItems } = useContext(cartContext);
  const { loveCount } = useContext(wishlisContext);
  const navigate = useNavigate();

  const [toggleCart, seToggleCart] = useState(true);

  useEffect(() => {
    const navBar = document.getElementById("navbar");
    window.addEventListener("scroll", function () {
      if (this.scrollY > 100) {
        navBar.classList.replace("bg-transparent", "bg-c2");
      } else {
        navBar.classList.replace("bg-c2", "bg-transparent");
      }
    });
    return () => {
      window.addEventListener("scroll", function () {
        if (this.scrollY > 100) {
          navBar.classList.replace("bg-transparent", "bg-c2");
        } else {
          navBar.classList.replace("bg-c2", "bg-transparent");
        }
      });
    };
  }, []);
  function logoutFunc() {
    setToken(null);
    localStorage.clear();
    navigate("/login");
  }

  function cartSideBarShow() {
    const cartSideBar = document.getElementById("cartsidebar");
    if (toggleCart) {
      cartSideBar.classList.replace("hidecartsidebar", "showcartsidebar");
      seToggleCart(false);
    } else {
      cartSideBar.classList.replace("showcartsidebar", "hidecartsidebar");
      seToggleCart(true);
    }
  }
  return (
    <Disclosure
      id="navbar"
      as="nav"
      className="bg-transparent fixed w-100 z-50"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-c1 hover:bg-c1 hover:text-c3">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-16 w-100"
                    src={require("../../images/logo.png")}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex items-center">
                  <div className="flex space-x-4 items-center">
                    <NavLink
                      to="/home"
                      className={(navData) =>
                        navData.isActive
                          ? "text-c3 px-3 py-2 text-lg font-medium"
                          : "text-c1 transition duration-300  hover:text-c3 px-3 py-2 text-lg font-medium"
                      }
                      aria-current="page"
                    >
                      Home
                    </NavLink>

                    {token ? (
                      <>
                        <NavLink
                          to="/products"
                          className={(navData) =>
                            navData.isActive
                              ? "text-c3 px-3 py-2 text-lg font-medium"
                              : "text-c1 transition duration-300  hover:text-c3 px-3 py-2 text-lg font-medium"
                          }
                        >
                          Products
                        </NavLink>
                      </>
                    ) : (
                      ""
                    )}
                    <NavLink
                      to="categories"
                      className={(navData) =>
                        navData.isActive
                          ? "text-c3 px-3 py-2 text-lg font-medium"
                          : "text-c1 transition duration-300  hover:text-c3 px-3 py-2 text-lg font-medium"
                      }
                    >
                      Categories
                    </NavLink>
                    <NavLink
                      to="brands"
                      className={(navData) =>
                        navData.isActive
                          ? "text-c3 px-3 py-2 text-lg font-medium"
                          : "text-c1 transition duration-300  hover:text-c3 px-3 py-2 text-lg font-medium"
                      }
                    >
                      Brands
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {token ? (
                  <>
                    <button
                      onClick={cartSideBarShow}
                      className="relative rounded-full text-c1 transition duration-300 hover:text-c3 p-1"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <ShoppingCartIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {alltotalCartItems || "0"}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </button>
                    <Link
                      to="/Wishlist"
                      className="relative rounded-full  p-1 text-c1 hover:text-c3 ml-3"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <HeartIcon className="h-6 w-6" aria-hidden="true" />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {loveCount || "0"}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </Link>

                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full  text-sm text-c1 hover:text-c3 ">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <EllipsisVerticalIcon className="h-8 w-8 rounded-full" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={logoutFunc}
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100 w-100 text-left" : "",
                                  "block px-4 py-2 text-sm text-gray-700 w-100 text-left"
                                )}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Link
                      style={{ lineHeight: "2.3em", textAlign: "center" }}
                      to="/Signup"
                      className="btncta"
                    >
                      sign up
                    </Link>
                    <Link
                      style={{ lineHeight: "2.3em", textAlign: "center" }}
                      to="/Login"
                      className="btncta"
                    >
                      log in
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden bg-c2">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <NavLink
                to="/home"
                className={(navData) =>
                  navData.isActive
                    ? "block bg-c1 text-1 px-3 py-2 text-lg font-medium rounded-md"
                    : "block text-c1 transition duration-300  hover:text-c3 px-3 py-2 text-lg font-medium rounded-md"
                }
                aria-current="page"
              >
                Home
              </NavLink>

              <NavLink
                to="/products"
                className={(navData) =>
                  navData.isActive
                    ? "block bg-c1 text-1 px-3 py-2 text-lg font-medium rounded-md"
                    : "block text-c1 transition duration-300  hover:text-c3 px-3 py-2 text-lg font-medium rounded-md"
                }
              >
                Products
              </NavLink>
              <NavLink
                to="categories"
                className={(navData) =>
                  navData.isActive
                    ? "block bg-c1 text-1 px-3 py-2 text-lg font-medium rounded-md"
                    : "block text-c1 transition duration-300  hover:text-c3 px-3 py-2 text-lg font-medium rounded-md"
                }
              >
                Categories
              </NavLink>
              <NavLink
                to="brands"
                className={(navData) =>
                  navData.isActive
                    ? "block bg-c1 px-3 py-2 text-lg font-medium rounded-md"
                    : "block text-c1 transition duration-300  hover:text-c3 px-3 py-2 text-lg font-medium rounded-md"
                }
              >
                Brands
              </NavLink>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
