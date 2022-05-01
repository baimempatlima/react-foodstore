import React, { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Category from "../../components/Category";
import Tags from "../../components/Tags";
import Card from "../../components/Card";
import Footer from "../../components/Footer";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categorySend, setCategorySend] = useState({});
  const [page, setPage] = useState(1);
  const [tags, setTags] = useState([]);
  const [tagSend, setTagSend] = useState([]);
  const [query, setQuery] = useState("");
  const [detailUser, setDetailUser] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const headersAuth = { headers: { Authorization: `Bearer ${token}` } };
  const [carts, setCarts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const getProduct = async () => {
    try {
      await axios.get(`http://localhost:3000/api/products`).then((res) => setProducts(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  const getCagetories = async () => {
    try {
      await axios.get(`http://localhost:3000/api/categories`).then((res) => {
        setCategories(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getTags = async () => {
    try {
      await axios.get(`http://localhost:3000/api/tags`).then((res) => {
        if (res.data.error !== 1) {
          setTags(res.data);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getPage = async () => {
    try {
      let apiLink = `http://localhost:3000/api/products?`;

      let categorySelect = "";
      if (categorySend.name === undefined) {
        categorySelect = "";
      } else if (categorySend.name === "Default:") {
        categorySelect = "";
      } else {
        categorySelect = `category=${categorySend.name}`;
      }

      let tagsSelected = [];
      if (tagSend.length !== 0) {
        tagsSelected = tagSend.map((item, index) => `tags[${index}]=${item.name}`).join("&");
      } else {
        tagsSelected = "";
      }

      let querySelected = "";
      if (query.length !== 0) {
        querySelected = `q=${query}`;
      } else {
        querySelected = "";
      }

      let skip = "";
      if (page === 1) {
        skip = "";
      } else {
        skip = `skip=${(page - 1) * 10}`;
      }
      let linkApiSend = `${apiLink}${categorySelect !== "" ? `${categorySelect}&&` : ""}${tagsSelected !== "" ? `${tagsSelected}&&` : ""}${querySelected !== "" ? querySelected : ""}${skip !== "" ? skip : ""}`;

      await axios(linkApiSend).then((res) => setProducts(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const pageNext = () => {
    setPage(page + 1);
  };

  const pagePrev = () => {
    setPage(page - 1);
  };

  const authCheck = async () => {
    try {
      await axios.get(`http://localhost:3000/auth/me`, headersAuth).then((res) => {
        if (res.data.error !== 1) {
          setDetailUser(res.data);
        }
      });
    } catch (error) {
      console.log(error, "Auth Error");
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/auth/logout`, null, headersAuth).then((res) => {
        if (res.data.error !== 1) {
          localStorage.removeItem("token");
          setDetailUser([]);
          setToken("");
        }
      });
    } catch (error) {
      console.log(error, "logut error");
    }
  };

  const getCartCount = async () => {
    try {
      await axios.get(`http://localhost:3000/api/carts`, headersAuth).then((res) => {
        setCartCount(res.data.map((item) => item.qty).reduce((preVal, currentVal) => preVal + currentVal, 0));
        setCarts(res.data);
      });
    } catch (err) {
      console.log(err, "cant get the count carts");
    }
  };

  const cartsAdd = async (product) => {
    try {
      const { category, tags, description, createdAt, updatedAt, __v, _id, ...remainProduct } = product;
      let newProductData = remainProduct;

      if (carts.find((item) => item.product._id === _id)) {
        newProductData = carts.map((item) => ({ ...item, qty: item.product._id === _id ? item.qty + 1 : item.qty }));
      } else {
        newProductData = [...carts, { qty: 1, product: product, user: detailUser, ...remainProduct }];
      }

      let cartsDataCount = newProductData.map((item) => item.qty).reduce((preVal, currentVal) => preVal + currentVal, 0);
      setCartCount(cartsDataCount);
      setCarts(newProductData);

      await axios.put(`http://localhost:3000/api/carts`, { items: newProductData }, headersAuth);
    } catch (error) {
      console.log(error, "cant add carts");
    }
  };

  useEffect(() => {
    getCartCount();
    getProduct();
    getCagetories();
    getTags();
    authCheck();
  }, []);

  useEffect(() => {
    getPage();
  }, [categorySend, tagSend, query, page]);

  return (
    <div>
      <div>
        <div>
          <div>
            <nav className="navbar navbar-expand-lg  shadow-lg p-3 mb-5 bg-danger   rounded">
              <div className="container">
                <a className="navbar-brand" href="/">
                  BUY FOOD
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  {!!detailUser.full_name ? (
                    <div className="ms-auto">
                      <ul className="navbar-nav  mb-2 mb-lg-0 ">
                        <li className="nav-item">
                          <p style={{ marginRight: "10px" }} className={`${detailUser.role === "admin" ? "text-uppercase" : ""}"text-capitalize mt-2 badge bg-warning "`}>{`${detailUser.full_name}`}</p>
                        </li>
                        <li className="nav-item ">
                          <a className="nav-link" href="/cart/user">
                            Cart <div style={{ fontSize: "10px", display: "inline" }}>{cartCount}</div>
                          </a>
                        </li>
                        <li className="nav-item ">
                          <Link to="/account/user" className="nav-link active ml-2 " aria-current="page">
                            Account
                          </Link>
                        </li>
                        <li className="nav-item" onClick={(e) => logout(e)}>
                          <Link to="/" className="nav-link">
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="ms-auto">
                      <ul className="navbar-nav  mb-2 mb-lg-0 ">
                        <li className="nav-item ">
                          <Link to="/login" className="nav-link active" aria-current="page">
                            Login
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/register" className="nav-link">
                            Register
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="container">
            <div className="container">
              <div className="row justify-content-center">
                <div className="w-100 flex-container justify-content-center mb-3">
                  <div style={{ marginRight: "5px" }} className="mt-0">
                    <input type="text" className="form-control styleborder " placeholder="search your food or drinks" onChange={(e) => setQuery(e.target.value)} />
                  </div>
                  <div className="mt-2">
                    <Category categoryData={categories} setCategorySend={setCategorySend} />
                  </div>
                </div>

                <div className=" w-100 flex-container justify-content-center ">
                  <div style={{ marginRight: "5px", marginTop: "9px" }}>Tags:</div>
                  <div>
                    <Tags tagsData={tags} setTagSend={setTagSend} />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {products.length !== 0 ? (
              <div className="row justify-content-center">
                {products.map((product) => (
                  <div className="col-md-3 m-3">
                    <div>
                      <Card productData={product} userData={detailUser} onClick={() => cartsAdd(product)} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="justify-content-center">
                <Spinner animation="border" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <nav className="pagination justify-content-center">
          <div className="page">
            {page === 1 ? (
              ""
            ) : (
              <a className="page-link" onClick={() => pagePrev()} href="/#">
                &#8249;
              </a>
            )}
            <div className="py-0.5 px-6 rounded-md shadow-sm items-center justify-center border">{page}</div>
            {products.data?.length <= 10 && page * 10 < products.count ? (
              <a className="page-link" onClick={() => pageNext()} href="/#">
                &#8250;
              </a>
            ) : (
              ""
            )}
          </div>
        </nav>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
}
