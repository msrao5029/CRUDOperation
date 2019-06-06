
import React from 'react';
import decode from 'jwt-decode';
import testpage from './test'
class LoginBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gridBind: [],
            fields: {},
            errors: {}
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.handleValidation()) {
            this.FormSubmitDetails();
        } else {

        }

    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["uname"]) {
            formIsValid = false;
            errors["uname"] = "uname Cannot be empty";
        }

        //pwd
        if (!fields["pwd"]) {
            formIsValid = false;
            errors["pwd"] = "Password Cannot be empty";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }
    FormSubmitDetails() {
        let data = { username: this.state.fields.uname, pwd: this.state.fields.pwd };
        let gridresult = {};
        fetch('http://localhost:5000/userDetails',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)

            }).then(resposne => {
                // this.setToken(resposne.token)
                // return Promise.resolve(resposne)
                return resposne.json();
            })
            .then((items) => {
                gridresult = items.recordsets[0];
                //this.setState({ gridBind: gridresult });
                if (gridresult.length > 0) {
                    //  this.props.history.push('/Gridbind')
                    this.props.history.replace('/dashboard')
                }
                else {
                    alert('Fail!');
                }

            }).catch((err) => {
                console.log(err);

            });

    }

    handleCancel() {
        this.state = "";
    }

    CheckingValidations() {
        let gridresult = {};
        var headersOpt = {
            'Content-Type': 'application/json'
        };
        let data = {
            username: this.state.uname.value
        }
        fetch('http://localhost:5000/userDetails/', {
            method: 'POST',
            headers: headersOpt,
            JSON: true,
            body: JSON.stringify(data),
        })
            .then((resposne) => {
                console.log(resposne)
                return resposne.json()
            })
            .then((items) => {
                gridresult = items.recordset;
                this.setState({ gridBind: gridresult });
            }).catch((err) => {
                console.log(err);

            });
    }
    //login text box change events
    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
    }
    handleRegister(){
        this.props.history.replace('/Registaration')
    }

    render() {
        return (
            <div className="table-responsive">
                <h1>Login Details..Madhu</h1>
                <form id="form">
                    <div className="form-group">
                        <label>
                            Uname:
              <input type="text" className="form-control" value={this.state.fields.uname} name="uname" onChange={this.handleChange.bind(this)} />
                        </label>
                        <span style={{ color: "red" }}>{this.state.errors["uname"]}</span>

                    </div>
                    <div className="form-group">
                        <label>
                            Pwd:
                        <input className="form-control" value={this.state.fields.pwd} type="password" name="pwd" onChange={this.handleChange.bind(this)} />
                        </label>
                        <span style={{ color: "red" }}>{this.state.errors["pwd"]}</span>
                    </div>
                    <div>


                        <input type="button" className="btn btn-success" value="Submit" onClick={this.handleSubmit.bind(this)} />&nbsp;&nbsp;
                        <input type="submit" className="btn btn-primary" value="Cancel" onClick={this.handleCancel.bind(this)} /><br></br><br></br>
                        <input className="btn btn-primary" value="Register" onClick={this.handleRegister.bind(this)}/>
                    </div>

                </form>
            </div>
        );
    }
}
export default LoginBox


