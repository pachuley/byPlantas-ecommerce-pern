import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./orderTable.module.css";
import axios from "axios";
// import axios from 'axios';
const { REACT_APP_BACKEND_URL } = process.env;

export default function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    console.log("ejecuta");
    getOrders();
  }, []);
  const getOrders = async () => {
    console.log("orders");
    axios.get(`${REACT_APP_BACKEND_URL}/orders`).then((res) => {
      setOrders(...orders, res.data);
      setFecha(res.data[0].createdAt.split("T", 1));
    });
  };
  console.log(orders);
  return (
    <div className="container tabla">
      <div
        className="col-md-12 panel-right row tabla"
        style={{ paddingTop: "25px" }}
      >
        <div className="col-md-12 col-lg-12">
          <h2 className="text-center">
            <u>Todas las Ordenes</u>
          </h2>
          <table className="table table-hover table-dark thfontsize">
            <thead>
              <tr>
                <th scope="col">Id User</th>
                <th scope="col">Id Order</th>
                <th scope="col">Status</th>
                <th scope="col">F. Compra</th>
                <th scope="col">Detalles</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.userId}</td>
                  <td>{order.id}</td>
                  <td>{order.status}</td>
                  <td>{fecha}</td>
                  <td>
                    <button className={`btn btn-link`}>
                      <Link
                        className={` text-light`}
                        to={`admin/orders/${order.id}`}
                      >
                        detalle
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
