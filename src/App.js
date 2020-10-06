import React from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

//router components
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//layout components
import Sidebar from './components/layout/Sidebar';


//rest of components
import Orders from './components/orders/Orders';
import ProductsList from './components/products/ProductsList';
import Charts from './components/charts/Charts';
import Coupons from './components/coupons/Coupons'





function App() {
  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={()=> <Sidebar><Charts/></Sidebar>}/>
          <Route exact path="/coupons" render={()=> <Sidebar><Coupons/></Sidebar>}/>
          <Route exact path="/orders" render={()=> <Sidebar><Orders/></Sidebar>}/>
          <Route exact path="/products" render={()=> <Sidebar><ProductsList/></Sidebar>}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
