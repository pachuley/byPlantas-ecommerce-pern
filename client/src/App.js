import React from 'react';
import './App.css';
<<<<<<< Updated upstream

function App() {
  return (
    <div>

    </div>
=======
import 'bootstrap/dist/css/bootstrap.min.css'
import {Switch, Route} from 'react-router-dom'
import FormProduct from './Components/FormProduct/FormProduct';
import FormCategory from './Components/FormCategory/FormCategory';

function App() {
  return (
    <>
      <Switch>
        <Route path='/products' exact render={() => <FormProduct/>}/>
        <Route path='/products/category' render={() => <FormCategory/>}/>
      </Switch>
    </>
>>>>>>> Stashed changes
  );
}

export default App;
