import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LoginBox from './component/LoginBox';
import dashboard from './component/dashboard';
import Registaration from './component/register'
function App() {
  return (
    <div>
       {/* <ul>       
        <li><Link to="/contact">Contact</Link> </li>
        <li><Link to="/DropdownBind">DropdownBind</Link> </li>
        <li><Link to="/Gridbind">Home</Link> </li>
        <li><Link to="/test">Test</Link> </li>
        <li><Link to="/LoginBox">LogOut</Link> </li>
      </ul>  */}
      {/* <switch> */}
       
        {/* <Route exact path="/contact" component={ContactPage}></Route>
        <Route exact path="/Gridbind" component={Gridbind}></Route>
        <Route exact path='/DropdownBind' component={DropdownBind}></Route> */}
        <Route exact path='/dashboard' component={dashboard}></Route>
        <Route exact path='/LoginBox' component={LoginBox}></Route>
        <Route exact path='/Registaration' component={Registaration}></Route>
        <Route exact path='/' component={LoginBox}></Route>

      {/* </switch> */}
    </div>

  );
}

export default App;
