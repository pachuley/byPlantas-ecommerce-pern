import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import CatalogContainer from "./Components/CatalogContainer/CatalogContainer";
import FormProduct from "./Components/FormProduct/FormProduct";
import FormCategory from "./Components/FormCategory/FormCategory";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import NavBar from "./Ui_Components/Navbar/Navbar";
import Footer from "./Ui_Components/Footer/Footer";
import Home from "./Components/Home/Home";
import ProductList from "./Components/ProductList/ProductsList";
import AccountContainer from "./Components/AccountContainer/AccountContainer";
import Reset from "./Components/ResetPassword/ResetPassword";
import Admins from './Components/Admins/Admins';
import OrderTable from "./Components/OrderTable/OrderTable";
import Order from "./Components/Order/Order";
import Cart from "./Components/Cart/Cart";
import FormUser from "./Components/FormUser/FormUser";
import Profile from './Ui_Components/Profile/Profile'
import UsersTable from "./Components/UsersTable/UsersTable";
import CheckOut from "./Components/CheckOut/CheckOut";

function App() {
  return (
    <>
      <NavBar />
      <div className="masterSwitch">
        <Switch>
          <Route path="/" exact render={() => <Home />} />
          <Route path="/products" exact render={() => <CatalogContainer />} />
          <Route exact path="/products/:id" render={({ match }) => <ProductDetail match={match} />}/>
          <Route path="/addProduct" exact render={() => <FormProduct />} />
          <Route path="/addCategory" exact render={() => <FormCategory />} />
          <Route path="/productslist"><ProductList /></Route>
          <Route path="/admins" exact render={() => <Admins />} />
          <Route path="/login" exact render={({history,location}) => <AccountContainer history={history} location={location}/>} />
          <Route path="/cart" exact render={() => <Cart />} />
          <Route path="/checkout/:id" exact render={({match}) => <CheckOut match={match}/>} />
          {/* <Route path="/checkout/" exact render={() => <CheckOut />} /> */}
          <Route path="/login/reset" exact render={()=><Reset/>}/>
          <Route path="/login/reset/:token" exact render={()=><Reset/>}/>
          <Route path="/admins/orders" exact render={() => <OrderTable />} />
          <Route path="/users" exact render={() => <UsersTable />} />
          <Route path="/admins/orders/:id" render={({ match }) => <Order match={match} />}/>
          <Route path="/register" exact render={() => <FormUser />} />
          <Route path="/profile" exact render={() => <Profile />} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}
export default App;
