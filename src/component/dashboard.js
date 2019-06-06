import React from 'react';
import DropdownBind from './dropdownbind';
import Gridbind from './gridBind'
import TestPage from './test';
import Accordian from './Accordian';
import ContactPage from './contact';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class dashboard extends React.Component {
    LogOutDetails() {
        this.props.history.replace('/LoginBox')
    }
    constructor(props) {
        super(props);
        this.state = { addClass: false }
    }

    activeChangeEvent(event) {
        this.state.addClass = true;

        const className1 = this.state.addClass ? "nav-link active" : "nav-link";
        console.log(className1);
        // let boxClass = ["nav-link"]
        // if (event.target.text === "contact") {
        //     boxClass.push('active');
        // }
        // this.setState(
        //     {
        //         boxClass: event.target.text,
        //         ActiveClass:className1
        //     }
        // )

    }
    render() {

        //     let boxClass = ["nav-link"];
        //    if(this.state.boxClass==="Contact"){
        //       boxClass.push('active');
        //    }else if(this.state.boxClass==="Gridbind"){
        //       // boxClass.slice('')
        //     boxClass.push('active');
        //}
        return (
            <div>
                <Router>

                    <ul className="nav nav-pills">
                        <li className="nav-item navbar">
                            <Link className="nav-link" to="/DropdownBind">DropdownBind</Link>
                        </li>
                        <li className="nav-item navbar">
                            <Link className="nav-link" to="/contact" id="Contact" onClick={this.activeChangeEvent.bind(this)}>Contact</Link>
                        </li>

                        <li className="nav-item navbar">
                            <Link className="nav-link" to="/Gridbind" id="Gridbind" onClick={this.activeChangeEvent.bind(this)}>Gridbind</Link> </li>
                        <li className="nav-item navbar">
                            <Link className="nav-link" to="/test">Test</Link>
                        </li>
                        <li className="nav-item navbar">
                            <Link className="nav-link" to="/Accordian">Accordian</Link>
                        </li>
                        <li className="nav-item navbar">
                            <Link className="nav-link" to="/LoginBox" onClick={this.LogOutDetails.bind(this)}>LogOut</Link>
                        </li>

                        {/* <li className="nav-item">
                            <Link className="nav-link active" to="/DropdownBind">DropdownBind</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={boxClass.join(' ')} to="/contact" id="Contact" onClick={this.activeChangeEvent.bind(this)}>Contact</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={boxClass.join(' ')} to="/Gridbind" id="Gridbind" onClick={this.activeChangeEvent.bind(this)}>Gridbind</Link> </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/test">Test</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Accordian">Accordian</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/LoginBox" onClick={this.LogOutDetails.bind(this)}>LogOut</Link>
                        </li> */}


                    </ul>

                    <div>  
          
  </div> 

                    <Switch>
                        <Route exact path="/contact" component={ContactPage}></Route>
                        <Route path='/Gridbind' component={Gridbind} />
                        <Route path='/DropdownBind' component={DropdownBind} />
                        <Route path='/test' component={TestPage}></Route>
                        <Route path='/Accordian' component={Accordian}></Route>
                        <Route path='/' component={DropdownBind}></Route>

                    </Switch>

                </Router>


            </div>

        )
    }

}
export default dashboard