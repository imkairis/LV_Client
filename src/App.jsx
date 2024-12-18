import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import Checkout from "./pages/Checkout/index";
import ThanksPage from "./pages/Thanks";
import Info from "./pages/Info/AccountPage";
import { Toaster } from "react-hot-toast";
import Adopt from "./pages/Adopt/AdoptPage";
import AdoptDetail from "./pages/Adopt/AdoptDetail";
import AddPetForm from "./components/Adopt/AddAdopt";
import Footer from "./components/home/Footer/Footer";
import AccountOrder from "./pages/Info/AccountOrder";
import OrderDetailClient from "./pages/Order/Order";
import AccountAdopt from "./pages/Info/AccountAdopt";
import UpdateAdopt from "./pages/Adopt/UpdateAdopt";

const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/journal" element={<Journal />}></Route>
        <Route path="/info" element={<Info />}></Route>
        <Route path="/account-orders" element={<AccountOrder />} />
        {/* Định tuyến đến chi tiết đơn hàng với orderId */}
        <Route path="/order-detail/:id" element={<OrderDetailClient />} />
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/offer" element={<Offer />}></Route>
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
        <Route path="/thanks" element={<ThanksPage />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/adopt/:id" element={<AdoptDetail />} />
        <Route path="/account-adopt" element={<AccountAdopt />} />
        <Route path="/addpet" element={<AddPetForm />} />
        <Route path="/adopt/update/:id" element={<UpdateAdopt />} />
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
