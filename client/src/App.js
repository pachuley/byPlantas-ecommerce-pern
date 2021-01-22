import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Switch, Route} from 'react-router-dom'
import Product from './Components/Product/Product'
import Catalog from './Components/Catalog/Catalog'

function App() {
  return (
    <>
      <Switch>
        <Route path="/products" exact render={() => <Catalog/>}/>
        <Route path='/products/:id' render={({match}) => <Product match={match}/>}/>
        <Route path='/products' exact render={() => <FormProduct/>}/>
        <Route path='/products/category' render={() => <FormCategory/>}/>
      </Switch>
    </>
  );
}
export default App;
