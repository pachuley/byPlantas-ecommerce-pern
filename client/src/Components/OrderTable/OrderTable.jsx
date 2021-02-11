import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./orderTable.module.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { getAllOrders, filterOrders } from "../../Redux/actions/orderActions";

function OrderTable({ allOrders, getAllOrders, filterOrders }) {
  const userLogin = useSelector((state) => state.userLogin);

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleColor = (status) => {
    switch (status) {
      case "active":
        return "table-info";
      case "canceled":
        return "table-danger";
      case "processing":
        return "table-secondary";
      case "complete":
        return "table-success";
      default:
        break;
    }
  };
  const handleFilterOrders = (e) => {
    filterOrders(e.target.value);
  };
  let isAuth =
    userLogin.userLogin && userLogin.userLogin?.role === "ADMIN_ROLE";
  return isAuth ? (
    <div className="container tabla">
      <div className="col-md-12 panel-right row tabla">
        <div className="col-md-12 col-lg-12">
          <h2 className={`m-0 text-center p-5`}>
            Accede a tu cuenta o registrate como Nuevo Usuario!
          </h2>
          <div className={`container text-right`}>
            <div className="row">
              <div className="col-sm"></div>
              <div className="col-sm"></div>
              <div className="col-sm text-center">
                <select
                  name="select"
                  className={`selectpicker mb-3 `}
                  onChange={handleFilterOrders}
                >
                  <option value="todas">todas</option>
                  <option value="active">active</option>
                  <option value="processing">processing</option>
                  <option value="complete">complete</option>
                  <option value="canceled">canceled</option>
                </select>
              </div>
            </div>
          </div>
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
              {allOrders.map((order) => (
                <tr key={order.id} className={handleColor(order.status)}>
                  <td>{order.userId}</td>
                  <td>{order.id}</td>
                  <td>{order.status}</td>
                  <td>{order.createdAt.split("T", 1)}</td>
                  <td>
                    <button className={`btn btn-dark`}>
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
function mapStateToProps(state) {
  return {
    allOrders: state.orders.orders,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllOrders: () => dispatch(getAllOrders()),
    filterOrders: (state) => dispatch(filterOrders(state)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTable);
