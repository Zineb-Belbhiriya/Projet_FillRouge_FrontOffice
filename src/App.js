import "./App.css";

import Header from "./Components/Layouts/Header";
import Footer from "./Components/Layouts/Footer";
import Home from "./Components/Home";

import { BrowserRouter, Route } from "react-router-dom";
import ProductDetails from "./Components/private/ProductDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        {/* <Route path="/" element={<Home />} exact />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} exact /> */}

        <Route path="/" component={Home} exact />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/product/:id" component={ProductDetails} exact />

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
