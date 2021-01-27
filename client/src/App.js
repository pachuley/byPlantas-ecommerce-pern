import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import CatalogContainer from './Components/CatalogContainer/CatalogContainer'
import FormProduct from './Components/FormProduct/FormProduct'
import FormCategory from './Components/FormCategory/FormCategory'
import ProductDetail from './Components/ProductDetail/ProductDetail'
import NavBar from './Ui_Components/Navbar/Navbar';
import Footer from './Ui_Components/Footer/Footer';
import Home from './Components/Home/Home'
import ProductList from './Components/ProductList/ProductsList'

function App() {
  return (
    <>
      <NavBar />
      <div class='masterSwitch'>
        <Switch>
          <Route path='/' exact render={() => <Home />}/>
          <Route path="/products" exact render={() => <CatalogContainer/>}/>
          <Route exact path='/products/:id' render={({match}) => <ProductDetail match={match}/>}/>
          <Route path='/addProduct' exact render={() => <FormProduct/>}/>
          <Route path='/addCategory' exact render={() => <FormCategory/>}/>
          <Route path='/productslist'>
            <ProductList />
          </Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
}
export default App;
