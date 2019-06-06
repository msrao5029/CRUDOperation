import React from 'react';

class Registaration extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     uname: '',
        //     Pwd: '',
        //     Email: '',
        //     City: ''
        // }
        this.state = {
            items: []
        }
        this.dropdownlists = ["Arsenal", "Bournemouth", "Brighton and Hove Albion"];
        this.SubmitRegistration = this.SubmitRegistration.bind(this);


    }
    //dropdown binding..

    SubmitRegistration() {
        console.log(this.state.uname);
        console.log(this.state.pwd);
        console.log(this.state.email);
        console.log(this.state.city);

        this.FormSubmitDetails();


    }
    BackRegistration() {
        this.props.history.replace('/LoginBox');
    }
    FormSubmitDetails() {
        let form = document.getElementById('form');
        let data = {
            username: this.state.uname,
            pwd: this.state.pwd,
            email: this.state.email,
            city: this.state.city
        };
        let gridresult = {};
        // form.addEventListener('submit', (e) => {
        fetch('http://localhost:5000/userDetails/registration', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res) // log response object
            return res.json() // return json data from the server
        })
            .then((items) => {
                gridresult = items.recordsets[0];
                //this.setState({ gridBind: gridresult });
                if (gridresult.length > 0) {
                    alert('Record Inserted.please login again!');
                }
                else {
                    alert('Fail to Inserted to record!');
                }

            }).catch((err) => {
                console.log(err);

            });
        //})
    }
    unamechange(event) {
        this.setState({ uname: event.target.value });
    }
    pwdchange(event) {
        this.setState({ pwd: event.target.value });
    }
    emailchange(event) {
        this.setState({ email: event.target.value });
    }
    citychange(event) {
        this.setState({ city: event.target.value });
    }
    // componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/todos/1')
    //         .then(response => response.json())
    //         .then(json => {
    //             // this.state = json;
    //             this.setState({ items: json })
    //         })
    //     var team = this.dropdownlists.map(team => { return { value: team, display: team } });
    //     this.setState({ teams: team });
    // }
    render() {
        var { items } = this.state;

        return (
            <form id="form">
                <div>

                    <div>
                        <label>
                            Uname:
              <input type="text" name="username" onChange={this.unamechange.bind(this)} />
                        </label>
                    </div>

                    <div>
                        <label>
                            Pwd:
              <input type="text" onChange={this.pwdchange.bind(this)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Email:
              <input type="text" onChange={this.emailchange.bind(this)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            City:
              <input type="text" onChange={this.citychange.bind(this)} />
                        </label>
                    </div>

                    <div>

                        <input type="button" className="testmadhu" value="Submit" onClick={this.SubmitRegistration} />
                        <input type="button" className="testmadhu" value="Back" onClick={this.BackRegistration.bind(this)} />

                    </div>

                </div>
            </form>
        );
    }
}

export default Registaration