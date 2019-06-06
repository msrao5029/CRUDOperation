import React from 'react';

import LoginBox from './LoginBox';
import Registaration from './register';

class HomePage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isLoginOpen: true,
            isRegisterOpen: false
        }
    }
    showLoginBox() {
        this.props.history.push('/contact');
        this.setState({ isLoginOpen: true, isRegisterOpen: false });
    }
    showRegisterBox() {
        this.setState({ isRegisterOpen: true, isLoginOpen: false });

    }
    render() {
        return (
            <div>
                <input className="btn btn-primary" type="button" value="Login Details" onClick={this.showLoginBox.bind(this)} />&nbsp;&nbsp;
            <input className="btn btn-primary" value="Register" onClick={this.showRegisterBox.bind(this)} />
                <div className="box-container">
                    {this.state.isLoginOpen && <LoginBox />}
                    {this.state.isRegisterOpen && <Registaration />}
                </div>
            </div>
        );
    }
}

export default HomePage
