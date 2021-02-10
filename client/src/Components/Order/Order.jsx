import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../CartLine/cartline.module.css";
import style from "./Order.module.css";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const { REACT_APP_BACKEND_URL } = process.env;

export default function Order({ match }) {
  //invocamos para saber si estamos loggeados desde redux
  let userLocalstorage = JSON.parse(localStorage.getItem("userInfo"));
  let config = {
    headers: {
      "Content-Type": "application/json",
      token: userLocalstorage !== null ? userLocalstorage.token : null,
    },
  };

  const [order, setOrder] = useState({});
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState(order.status);
  const userLogin = useSelector((state) => state.userLogin);

  var logged = userLogin.userLogin;
  console.log(logged);
  useEffect(() => {
    getOrder();
  }, [status]);
  const getOrder = () => {
    console.log("order");
    axios
      .get(`${REACT_APP_BACKEND_URL}/orders/${match.params.id}/orders`, config)
      .then((res) => {
        setOrder(res.data[0]);
        setFecha(res.data[0].createdAt.split("T", 1));
        setHora(res.data[0].createdAt.substr(11).split(".", 1));
      });
  };
  useEffect(() => {
    if (!logged) {
      if (!localStorage.getItem("Cart")) {
        localStorage.setItem("Cart", JSON.stringify({ Products: [] }));
      }
      const storage = JSON.parse(localStorage.getItem("Cart"));
      var subtotal = 0;
      storage.Products.forEach((x) => {
        subtotal = subtotal + parseFloat(x.price * x.quantity);
      });
      setProducts(storage.Products);
      setTotal(subtotal);
    } else {
      buscarProducts();
    }
  }, []);

  const buscarProducts = () => {
    axios
      .get(`${REACT_APP_BACKEND_URL}/users/${match.params.id}/cart`, config)
      .then((resp) => {
        console.log(resp);
        setProducts(resp.data[0].products);
        var subtotal = 0;
        resp.data[0].products.forEach((x) => {
          subtotal = subtotal + parseFloat(x.price * x.orderline.quantity);
        });
        setTotal(parseFloat(subtotal));
      })
      .catch((error) => {
        console.log({
          status: "error",
          message: error.message,
        });
      });
  };
  const handleStatus = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };

  const handleButtonEdit = (e) => {
    let body = { status: status };
    axios
      .put(`${REACT_APP_BACKEND_URL}/orders/${order.id}`, body, config)
      .then((res) => {
        console.log(res);
        window.location = `/admin/orders/${order.id}`;
      });
  };
  let isAuth =
    userLogin.userLogin && userLogin.userLogin?.role === "ADMIN_ROLE";
  return isAuth ? (
    <Fragment>
      <div className="container mt-5">
        <button className={`btn btn-dark mt-4`}>
          <Link className={`text-light`} to={`/orders`}>
            Atras
          </Link>
        </button>
        <h2 className={`text-center`}>Orden del usuario {order.userId}</h2>
        <div className={`container d-flex mt-5 border ${style.order}`}>
          <div className="col-md-4 border border-light">
            <h2 className={`text-center pt-5`}>
              <u>Order ID:</u> <span>{order.id}</span>
            </h2>
          </div>
          <div className="col-md-8  p-3">
            <h3 className={`text-center`}>
              Estado: <span>{order.status}</span>
            </h3>
            <h3 className={`text-center`}>
              Fecha de compra: <span>{fecha}</span> - Hora : <span>{hora}</span>
            </h3>
            <div className="container border border-ligth">
              <h2 className={`text-center`}>
                <u>Productos</u>
              </h2>
              {products !== undefined && products.length !== 0
                ? (console.log("entra"),
                  products.map(
                    (product) => (
                      console.log(product),
                      (
                        <div className={`container bg-white`}>
                          <hr />
                          <div className="">
                            <h6 className={`${styles.productName}`}>
                              {product.name}
                            </h6>
                          </div>
                          <div className={`container ${styles.productDetails}`}>
                            <span className="">
                              {" "}
                              ARS${" "}
                              {logged
                                ? product.orderline.price
                                : product.price}{" "}
                            </span>
                            <span className="">
                              {" "}
                              Cantidad: {product.orderline.quantity}{" "}
                            </span>
                            <span>
                              Total:
                              {product.price * product.orderline.quantity}
                            </span>
                            {/* product.price * product.orderline.quantity */}
                          </div>
                        </div>
                      )
                    )
                  ))
                : (console.log("no hay prod"),
                  (<span> No hay productos</span>))}
            </div>
            <h3 className={`text-center`}>
              Total de Compra: $ <span>{total}</span>
            </h3>
            <div className="container text-center">
              <button
                type="button"
                className="btn btnByPlantas"
                data-toggle="modal"
                data-target={`#id${order.id}`}
              >
                Estado
              </button>
            </div>

            <div className="modal" id={`id${order.id}`}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Editar Status Order</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="modal-body">
                    <div className="container text-center">
                      <div className="row">
                        <div className="col-sm">
                          <label>Status</label>
                        </div>
                        <div className="col-sm">
                          {order.status == "active" ? (
                            <select
                              name="select"
                              className={`selectpicker`}
                              onChange={handleStatus}
                            >
                              <option value="active">-</option>
                              <option value="processing">processing</option>
                              <option value="canceled">canceled</option>
                            </select>
                          ) : (
                            <select
                              name="select"
                              className={`selectpicker`}
                              onChange={handleStatus}
                            >
                              <option value="active">-</option>
                              <option value="complete">complete</option>
                              <option value="canceled">canceled</option>
                            </select>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btnByPlantas"
                      data-dismiss="modal"
                      onClick={(e) => {
                        handleButtonEdit(e);
                      }}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger"
                      data-dismiss="modal"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: {
          message: "Debes estar logueado y ser ADMIN.",
        },
      }}
    />
  );
}
