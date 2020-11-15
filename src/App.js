import React, {useState} from 'react';
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


import SettingsContext from './components/context/Settings'
import languageJSON from './utils/language.json'


function App() {

   const [settings, setSettings] = useState({
     lang: 'en'
   })

  const changeLang = lang => {
    localStorage.setItem('lang', lang)
    setSettings({...settings, lang: lang});
  }

  const getStr = keyword => {
    if(languageJSON[keyword]){
      return languageJSON[keyword][localStorage.getItem('lang')]
    }

    return keyword;
  }

  
  
  return (
    <SettingsContext.Provider value={{lang: localStorage.getItem('lang'), changeLang, getStr}}>
      <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/" render={() => <Sidebar><Charts /></Sidebar>} />
            <Route exact path="/coupons" render={() => <Sidebar><Coupons /></Sidebar>} />
            <Route exact path="/orders" render={() => <Sidebar><Orders /></Sidebar>} />
            <Route exact path="/products" render={() => <Sidebar><ProductsList /></Sidebar>} />
          </Switch>
        </Router>
      </div>          
    </SettingsContext.Provider>
  );
}

export default App;
