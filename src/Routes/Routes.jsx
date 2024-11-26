import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Login/Register/Register";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import ComparePage from "../Pages/ComparePage/ComparePage";
import StorPage from "../Pages/StorPage/StorPage";
import AddNewProduct from "../components/DashBoard/AddNewProduct/AddNewProduct";
import StoreDetails from "../Pages/StoreDetails/StoreDetails";
import AllUser from "../components/DashBoard/AllUser/AllUser";
import Order from "../components/DashBoard/Order/Order";
import DashboardLayout from "./../Layout/DashBoardLayout";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Error from "../components/404/Error";
import Wishlist from "../Pages/Wishlist/Wishlist";
import Profile from "../components/DashBoard/ProfilePage/Profile";
import ManageProduct from "../components/DashBoard/ManageProduct/ManageProduct";
import UpdateProduct from "../Pages/UpdateProduct/UpdateProduct";
import ManageCart from "../Pages/ManageCart/ManageCart";
import MemberDashBoard from "../components/DashBoard/MemberDashboard/MemberDashBoard";
import AddNewStore from "../components/DashBoard/AddNewStore/AddNewStore";
import UpdateStore from "../components/DashBoard/UpdateStore/UpdateStore";
import ManageStore from "../components/DashBoard/ManageStore/ManageStore";
import PromotionControl from "../components/DashBoard/PromotionControl/PromotionControl";
import Promotion from "../Pages/Promotion/Promotion";
import PromotionDetails from "../Pages/Promotion/PromotionDetails";
import CheckoutPage from "../Pages/Checkout/CheckoutPage";
import About from "../Pages/About/About";
import Contacts from "../Pages/Contacts/Contacts";
import FilterProduct from "../components/FilterProduct/FilterProduct";
import Success from "../Pages/SuccessPage/Success";
import Fail from "../Pages/FailPage/Fail";
import Cancel from "../Pages/CancelPage/Cancel";
import CompleteOrder from "../components/DashBoard/Order/CompleteOrder";
import Thanks from "../Pages/TnaksPage/Thanks";
import UserOrder from "../components/DashBoard/MemberDashboard/UserOrder";
import TopProducts from "../Pages/TopProducts";
import CookiePolicy from "../Pages/CookiePolicy/CookiePolicy";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../Pages/TermsAndConditions/TermsAndConditions";
import RefundPolicy from "../Pages/Refundpolicy/RefundPolicy";
import MemberOrder from "../components/DashBoard/MemberOrder/memberOrder";
<<<<<<< HEAD
import DashBoardProfile from "../components/DashBoard/DashBoardProfile/DashBoardProfile";
=======
import UserOrder from "../components/DashBoard/MemberDashboard/UserOrder";
import TopProducts from "../Pages/TopProducts";
import CompleteOrder from "../components/DashBoard/Order/CompleteOrder";

import MemberOrder from "../components/DashBoard/MemberOrder/MemberOrder";
import SecureRoute from "../PrivateRoute/SecureRoute";

>>>>>>> 670ba5beab5fe3ab8aa421bcd61e03440cd2abbb

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/productDetails/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/products/`),
      },
      {
        path: "/comparePage",
        element: (
          <PrivateRoute>
            <ComparePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/storesPage",
        element: <StorPage />,
      },
      {
        path: "/storeDetails/:id",
        element: <StoreDetails />,
      },
      {
        path: "/promotion",
        element: <Promotion />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/cookiePolicy",
        element: <CookiePolicy></CookiePolicy>,
      },
      {
        path: "/privacyPolicy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "/termsAndConditions",
        element: <TermsAndConditions></TermsAndConditions>,
      },
      {
        path: "/refundPolicy",
        element: <RefundPolicy></RefundPolicy>,
      },
      {
        path: "/promotionsDetails/:id",
        element: <PromotionDetails />,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/promotions/`),
      },
      {
        path: "manageCart",
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 670ba5beab5fe3ab8aa421bcd61e03440cd2abbb
        element: (
          <PrivateRoute>
            <ManageCart />
          </PrivateRoute>
        ),
<<<<<<< HEAD
=======
      },

      {
        path: "/checkout-page",
        element: <CheckoutPage />,
      },
      {
        path: "/shop-page",
        element: <FilterProduct />,
      },
=======
        element: <PrivateRoute><ManageCart /></PrivateRoute>,
>>>>>>> 670ba5beab5fe3ab8aa421bcd61e03440cd2abbb
      },
      {
        path: "/checkout-page",
        element: <CheckoutPage />,
      },
      {
        path: "/shop-page",
        element: <FilterProduct />,
      },
>>>>>>> 87defe66094a9c69b31850a4ce42b6ae882cb713
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/thanks",
    element: <Thanks />,
  },
  {
    path: "/success/:sTranId",
    element: <Success />,
  },
  {
    path: "/fail",
    element: <Fail />,
  },
  {
    path: "/cancel",
    element: <Cancel />,
  },
<<<<<<< HEAD

  {
    path: "/complete-order/:tranId",
    element: <CompleteOrder />,
  },

  {
    path: "/top",
=======
  {
    path: "/complete-order/:tranId",
    element: <CompleteOrder />,
  },
  {
<<<<<<< HEAD
    path: "/top",
=======
    path: '/top',
>>>>>>> 87defe66094a9c69b31850a4ce42b6ae882cb713
>>>>>>> 670ba5beab5fe3ab8aa421bcd61e03440cd2abbb
    element: <TopProducts />,
  },

  // Dashboard routes

  // dashboard route

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "promotionControl",
        element: <PromotionControl />,
      },
      {
        path: "manageProduct",
        element: <ManageProduct />,
      },
      {
        path: "manageStore",
        element: <ManageStore />,
      },
      {
        path: "updateProduct/:id",
        element: <UpdateProduct />,
      },
      {
        path: "updateStore/:id",
        element: <UpdateStore />,
      },
      {
        path: "addProduct",
        element: <AddNewProduct />,
      },
      {
        path: "addStore",
        element: <AddNewStore />,
      },
      {
        path: "user",
        element: <AllUser />,
      },
      {
        path: "Order-List",
        element: <Order />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "dashboard-layout",
        element: <DashBoardProfile />,
      },
      {
        path: "my-account",
        element: <MemberDashBoard />,
      },
      {
        path: "member-order",
        element: (
          <SecureRoute>
            <MemberOrder />
          </SecureRoute>
        ),
      },
      {
        path: "userOrder",
        element: <UserOrder />,
      },
<<<<<<< HEAD

      {
        path: "orders",
        element: <UserOrder />,
      },
=======
      // Add more dashboard routes as needed
>>>>>>> 87defe66094a9c69b31850a4ce42b6ae882cb713
    ],
  },
]);

export default router;
