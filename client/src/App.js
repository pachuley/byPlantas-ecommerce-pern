import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Switch, Route} from 'react-router-dom'
import ProductCard from './Components/Product/Product'
import CatalogContainer from './Components/CatalogContainer/CatalogContainer'
import FormProduct from './Components/FormProduct/FormProduct'
import FormCategory from './Components/FormCategory/FormCategory'
import ProductDetail from './Components/ProductDetail/ProductDetail'
import NavBar from './Components/Navbar/Navbar'


function App() {
  return (
    <>
      <Switch>
        <Route path="/products" exact render={() => <CatalogContainer/>}/>
        <Route path='/products/:id' render={({match}) => <ProductDetail match={match}/>}/>
        <Route path='/formCategory' render={() => <FormCategory/>}/>
        <Route path='/formProducts' exact render={() => <FormProduct/>}/>
      </Switch>
    </>
  );
}
export default App;
