import React from 'react';
import './App.css';
import {Switch, Link, Route} from 'react-router-dom'
import Product from './Components/Product/Product'
import Catalog from './Components/Catalog/Catalog'

function App() {
  return (
    <>
      <Switch>
        <Route path="/products" exact render={() => <Catalog/>}/>

        <Route path='/products/:id' render={({match}) => <Product match={match}/>}/>
      </Switch>


    </>
  );
}

 

export default App;
