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
      <div class='masterSwitch'>
        <Switch>
          <Route path="/products" exact render={() => <CatalogContainer/>}/>
          <Route exact path='/products/:id' render={({match}) => <ProductDetail match={match}/>}/>
          <Route path='/addProduct' exact render={() => <FormProduct/>}/>
          <Route path='/addCategory' exact render={() => <FormCategory/>}/>
        </Switch>
      </div>
      <Footer />
    </>
  );
}
export default App;
