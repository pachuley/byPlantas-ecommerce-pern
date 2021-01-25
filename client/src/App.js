import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Switch, Route} from 'react-router-dom'

import CatalogContainer from './Components/CatalogContainer/CatalogContainer'
import FormProduct from './Components/FormProduct/FormProduct'
import FormCategory from './Components/FormCategory/FormCategory'
import ProductDetail from './Components/ProductDetail/ProductDetail'
import NavBar from './Components/Navbar/Navbar';
import Footer from './Ui_Components/Footer/Footer';


function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/products" render={() => <CatalogContainer/>}/>
        <Route path='/products/:id' render={({match}) => <ProductDetail match={match}/>}/>
        <Route path='/addProduct' exact render={() => <FormProduct/>}/>
        <Route path='/addCategory' exact render={() => <FormCategory/>}/>
      </Switch>
      <Footer />
    </>
  );
}
export default App;
