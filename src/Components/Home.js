import React, { Fragment, useEffect, useState } from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Utils/Redux/Actions/ProductAction";
import Product from "./private/Product";
import MetaData from "../Components/Layouts/MetaData";
import Loader from "../Components/Layouts/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

import Pagination from "react-js-pagination";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([1, 1000]);

  const { loading, products, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const keyword = useParams().keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error.message);
    }
    alert.success("Products Loaded");
    dispatch(getProducts(keyword, currentPage, price));
  }, [dispatch, alert, error, keyword, currentPage, price]);

  function handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    setCurrentPage(pageNumber);
  }

  return (
    <Fragment>
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : (
        <Fragment>
          <MetaData title={"By Best Products Online"} />
          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      
                      <Range
                        marks={{
                          1: `${1}`,
                          1000: `1000`,
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `${value}`}
                        tipProps={{
                          placment: "top",
                          visible: true,
                        }}
                        value={price}
                        onchange={(price) => setPrice(price)}
                      />
                    </div>
                  </div>
                </Fragment>
              ) : (
                products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))
              )}
            </div>
          </section>
          {resultPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={handlePageChange}
                nextPageText="Next"
                prevPageText="Previous"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
