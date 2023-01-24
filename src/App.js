import { Route, Routes } from "react-router-dom";
import Book from "./Book";
import Navbar from "./component/Navbar";
import Home from "./Home";
import Login from "./Login";
import Payment from "./Payment";
import Signup from "./Signup";
import Success from "./Success";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/travel/:id" element={<Book />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/success" element={<Success />} />
      </Routes>
    </>
  );
}

export default App;
