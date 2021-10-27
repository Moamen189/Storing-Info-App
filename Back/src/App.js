import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import Admin from './components/Admin';
import Home from './components/Home';
import Nav from './components/Nav';
import "./app.css"

function App() {
  const [change , setChange] = useState(null)
  return (
    <React.Fragment>
      <Nav/>
      <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/admin"  component={Admin}/>
      </Switch>
    </React.Fragment>
  );
}


export default App;
