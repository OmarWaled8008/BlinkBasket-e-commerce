# BlinkBasket

> A modern, responsive e-commerce storefront built with React 18 — browse products, manage a cart and wishlist, and check out with cash or card.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.23-CA4245?logo=reactrouter&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)
![Create React App](https://img.shields.io/badge/Create_React_App-5.0-09D3AC?logo=createreactapp&logoColor=white)

BlinkBasket is a single-page e-commerce front end powered by the public [Route Academy E-Commerce API](https://ecommerce.routemisr.com). It covers the full shopping flow: account creation and login, product discovery and filtering, product details, a slide-out mini-cart, a full cart page, wishlist, shipping details, cash or card checkout, and order history.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Routes](#routes)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [API Reference](#api-reference)
- [Known Limitations & Roadmap](#known-limitations--roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Overview

BlinkBasket is a client-side React application bootstrapped with Create React App. It combines Tailwind CSS, Bootstrap 5, and CSS Modules for a custom purple-and-neutral design, with animated carousels, 3D category cards, toast notifications, and loading states.

Authentication is JWT-based: the token returned by the API is stored in `localStorage` under the key `tkn` and attached to protected requests. Routes such as Products, Cart, Payment, Orders, and Wishlist are guarded by a `ProtectedRoute` wrapper that redirects unauthenticated visitors to the login page.

> **Note:** The app talks directly to a shared, public demo API and requires no backend of its own. Product data and any accounts you create are stored on that external service.

## Features

- **Authentication** — Sign up and log in with Formik-powered validation; JWT persisted in `localStorage`; automatic redirect to login for protected pages.
- **Home page** — Auto-playing hero banner carousel, promotional tiles, category carousel with 3D cards, and a featured deal section.
- **Product catalog** — Live title search and category sidebar filtering, ratings, prices, add-to-cart, and wishlist toggle.
- **Product details** — Image gallery with synced thumbnail slider, rating, brand, category, description, and add-to-cart.
- **Cart** — Slide-out mini-cart in the navbar plus a full cart page with quantity controls, item removal, clear-cart, totals, and checkout.
- **Wishlist** — Save products, move them to the cart, or remove them from the wishlist.
- **Checkout** — Shipping address form with two payment options: cash on delivery or card via a Stripe Checkout session.
- **Order history** — View past orders with items, total, payment method, and paid/delivered status.
- **Polished UX** — Toast notifications, spinner loaders, responsive navbar and footer, hover animations, and Framer Motion 3D cards.
- **Responsive layout** — Mobile navigation drawer and Bootstrap grid layouts across breakpoints.

## Tech Stack

| Category | Technologies |
| --- | --- |
| **Core** | React 18, Create React App (`react-scripts` 5) |
| **Routing** | React Router DOM 6 |
| **Data fetching** | Axios, React Query 3 |
| **Forms & validation** | Formik |
| **Styling** | Tailwind CSS 3, Bootstrap 5, CSS Modules, custom CSS |
| **UI & animation** | Framer Motion, Headless UI, Heroicons, React Icons, Font Awesome |
| **Carousels** | React Slick + Slick Carousel, React Owl Carousel |
| **Feedback** | React Hot Toast, React Loader Spinner |
| **Auth utilities** | jwt-decode |
| **Tooling** | ESLint (CRA config), Testing Library, Tailwind Merge |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (bundled with Node.js)
- An internet connection, since all data comes from the public API

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/blinkbasket.git
   cd blinkbasket
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

No environment variables are required — the API base URLs are currently defined directly in the source. To use a different backend, search for `ecommerce.routemisr.com` and `route-ecommerce.onrender.com` and replace those endpoints.

### Production build

```bash
npm run build
```

The optimized bundle is written to the `build/` folder and can be deployed to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Runs the app in development mode at `http://localhost:3000` with hot reload. |
| `npm run build` | Creates an optimized production build in `build/`. |
| `npm test` | Launches the test runner in interactive watch mode. |
| `npm run eject` | Ejects the Create React App configuration. **This is a one-way operation.** |

## Routes

| Path | Page | Access |
| --- | --- | --- |
| `/` and `/Home` | Home | Public |
| `/Products` | Product catalog | Protected |
| `/prodectdetails/:id` | Product details | Protected |
| `/Wishlist` | Wishlist | Protected |
| `/Cart` | Shopping cart | Protected |
| `/Payment/:cartId` | Checkout / payment | Protected |
| `/allorders` | Order history | Protected |
| `/Categories` | Categories | Public (placeholder) |
| `/Brands` | Brands | Public (placeholder) |
| `/Signup` | Create account | Public |
| `/login` | Log in | Public |
| `*` | 404 — Not found | Public |

## Project Structure

```text
blinkbasket/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Cartsidebar/          # Slide-out mini-cart
│   │   ├── Footer/
│   │   ├── Layout/               # Navbar + cart sidebar + outlet + footer
│   │   ├── Navbar/
│   │   ├── ProductdetailsSlider/ # Synced image gallery
│   │   ├── ProtectedRoute/       # Auth guard
│   │   ├── Slidercomp/           # Home hero carousel
│   │   ├── ThreeDCardDemo/       # Animated 3D category card
│   │   └── ui/                   # Reusable UI primitives (3D card, image slider)
│   ├── context/
│   │   ├── authentication.js     # JWT / auth state
│   │   ├── cartallapis.js        # Cart state + cart API calls
│   │   └── wishlistapi.js        # Wishlist state + API calls
│   ├── images/                   # Banners, logo, and illustrations
│   ├── pages/
│   │   ├── Brands/
│   │   ├── Cart/
│   │   ├── Categories/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Notfound/
│   │   ├── Orders/
│   │   ├── Payment/
│   │   ├── Productdetails/
│   │   ├── Products/
│   │   ├── Signup/
│   │   └── Wishlist/
│   ├── utils/cn.ts               # Tailwind class merge helper
│   ├── App.js                    # Router + providers
│   ├── index.js                  # Entry point and global styles
│   └── index.css                 # Tailwind directives and global styles
├── tailwind.config.js
├── package.json
└── README.md
```

## How It Works

- **Providers** — `App.js` composes `AuthProvider`, `QueryClientProvider`, `CartProvider`, and `WishlistProvider` around the router. React Query caches product, category, wishlist, and order requests.
- **Authentication** — `AuthProvider` hydrates the token from `localStorage` (`tkn`) on mount. `ProtectedRoute` checks that token and redirects to `/login` when it is missing.
- **Cart** — `CartProvider` loads the current cart on startup and exposes add, update quantity, remove, and clear operations. Cart data is reflected in both the navbar badge and the mini-cart.
- **Wishlist** — `WishlistProvider` fetches the wishlist and keeps the heart badge count in sync.
- **Checkout** — The cart ID is passed to `/Payment/:cartId`. Cash orders are created directly; card payments open a Stripe Checkout session in a new tab.
- **Styling** — Tailwind handles utility classes, Bootstrap provides the grid and base components, and CSS Modules scope page-specific styles. The theme colors (`c1`–`c5`) are defined in both `tailwind.config.js` and `src/index.css`.

## API Reference

Base URL: `https://ecommerce.routemisr.com/api/v1`

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/auth/signup` | Create an account |
| `POST` | `/auth/signin` | Log in and receive a JWT |
| `GET` | `/products` | List products |
| `GET` | `/products/:id` | Product details |
| `GET` | `/categories` | List categories |
| `GET` | `/cart` | Get the current cart |
| `POST` | `/cart` | Add a product to the cart |
| `PUT` | `/cart/:id` | Update product quantity |
| `DELETE` | `/cart/:id` | Remove a product |
| `DELETE` | `/cart` | Clear the cart |
| `GET` | `/wishlist` | Get the wishlist |
| `POST` | `/wishlist` | Add a product to the wishlist |
| `DELETE` | `/wishlist/:id` | Remove a product from the wishlist |
| `POST` | `/orders/:cartId` | Create a cash order |
| `POST` | `/orders/checkout-session/:cartId` | Create a Stripe Checkout session |
| `GET` | `/orders/user/:userId` | Get a user's orders |

Authenticated endpoints require the header `token: <jwt>`.

## Known Limitations & Roadmap

This project is a learning-focused front end, and a few areas are intentionally incomplete:

- **Categories and Brands pages** are placeholders — `Categories` only renders a header, and `Brands` shows "in progress".
- **Social login** — Google and Apple buttons are visual only and are not connected to a provider.
- **Promo codes** — the promo code input on the cart page is UI-only.
- **Hard-coded API URLs** — endpoints should be moved into environment variables for easier deployment.
- **Stripe return URL** — the card checkout session is hard-coded to `http://localhost:3000` and must be updated for production.
- **Route typo** — product details live at `/prodectdetails/:id` (note the spelling); renaming it would require updating all links.
- **Currency** — prices are displayed in EGP, though one label in the mini-cart uses `$`.
- **No license file** — see [License](#license).

Potential next steps:

- [ ] Build out the Categories and Brands pages with real data.
- [ ] Add product sorting, price range filters, and pagination.
- [ ] Implement a working promo code flow.
- [ ] Add social authentication.
- [ ] Move API configuration into `.env` files.
- [ ] Add unit and integration tests for cart and checkout flows.
- [ ] Improve accessibility (focus states, ARIA labels, keyboard navigation).

## Contributing

Contributions are welcome. To propose a change:

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

4. Push the branch:

   ```bash
   git push origin feature/your-feature
   ```

5. Open a pull request describing what changed and why.

Please keep the existing code style, test your changes locally with `npm start`, and update this README if you add or change a feature.

## License

No license file is included in this repository at the moment. If you plan to publish or distribute the project, add a `LICENSE` file — the [MIT License](https://choosealicense.com/licenses/mit/) is a common, permissive choice.

## Acknowledgements

- [Route Academy E-Commerce API](https://ecommerce.routemisr.com) for the public backend used by this project.
- [Create React App](https://create-react-app.dev/) for the project scaffold.
- The maintainers of React, React Router, React Query, Tailwind CSS, Bootstrap, Framer Motion, and all other open-source libraries used here.

---

Built with React and a lot of ☕. Happy shopping!
