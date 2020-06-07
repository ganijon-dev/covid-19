import React, { Component} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import CountryList from './components/CountryList/CountryList';
import WorldMap from './components/WorldMap/WorldMap';
import Charts from './components/Charts/Charts';
class App extends Component {
    
    render() {
  
      return ( 
        <BrowserRouter>
       
        <div className = "App" >  
            <Navbar />
            <Redirect to='/countries/list'/>
            <Switch>
            
            <Route exact path= '/countries/list' component={CountryList}/>
            <Route exact path= '/world-map' component={WorldMap}/>
            <Route  exact path= '/world/statistics' component={Charts}/>
             
            </Switch>
            
        </div >
        </BrowserRouter>
      );
    };
}

export default App;