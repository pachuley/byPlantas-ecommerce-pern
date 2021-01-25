import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Switch, Route} from 'react-router-dom'
import NavBar from './Components/Navbar/Navbar';
import Footer from './Ui_Components/Footer/Footer';
import Catalog from './Components/Catalog/Catalog';
import Product from './Components/Product/Product'
import FormProduct from './Components/FormProduct/FormProduct'
import FormCategory from './Components/FormCategory/FormCategory'

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <Switch>
        <Route path="/products" exact render={() => <Catalog/>}/>
        <Route path='/products/:id' render={({match}) => <Product match={match}/>}/>
        <Route path='/addProduct' exact render={() => <FormProduct/>}/>
        <Route path='/addCategory' exact render={() => <FormCategory/>}/>
      </Switch>
      <Footer />
    </>
  );
}
export default App;
