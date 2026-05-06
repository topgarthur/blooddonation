
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Donors from "./components/Donors";
import Signup from "./components/Signup";
import Adddonors from "./components/Adddonors";
import Mpesapayment from "./components/Mpesapayment";
import Signin from "./components/Signin";
import InfoPage from "./components/InfoPage";
import ScheduleDonation from "./components/ScheduleDonation";


function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<Donors />} />
            <Route path="/register-donor" element={<Signup />} />
            <Route path="/request-blood" element={<Adddonors />} />
            <Route path="/schedule-donation" element={<ScheduleDonation />} />
            <Route path="/lipa-na-mpesa" element={<Mpesapayment />} />
            <Route path="/signin" element={<Signin />} />
            
            <Route path="/about" element={<InfoPage type="about" />} />
            <Route path="/contact" element={<InfoPage type="contact" />} />
            <Route path="/faqs" element={<InfoPage type="faqs" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
