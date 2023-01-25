import { Route, Routes } from "react-router-dom";
import Book from "./Book";
import Navbar from "./component/Navbar";
import Home from "./Home";
import Login from "./Login";
import PageNotFound from "./PageNotFound";
import Payment from "./Payment";
import Signup from "./Signup";
import Success from "./Success";
import UserBooking from "./UserBooking";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<UserBooking />} />
        <Route path="/flight/:id" element={<Book />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/success/:id" element={<Success />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
