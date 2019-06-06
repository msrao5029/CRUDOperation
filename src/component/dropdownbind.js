import React from 'react';

class DropdownBind extends React.Component {
    constructor() {
        super();
        this.state = {
            listBind: []           
        }
    }
    componentDidMount() {
        let dropdowndata = {};
        fetch('http://localhost:5000/').then(response => {
            return response.json();
        }).then(responsedata => {
            dropdowndata = responsedata.recordset;
            // dropdowndata.map((mapresponse) => {
            //     return mapresponse;
            // })
            console.log(dropdowndata);
            this.setState({ listBind: dropdowndata })
        })
    }
    render() {
        let planets = this.state.listBind;
            const optionItems = planets.map((planet) =>
                <option key={planet.Ename}>{planet.Ename}</option>
            );
        
        return (
            <div>
                <div>
                  
                </div>
                <select>
                    {optionItems}
                </select>
            </div>
        )

    }


}
export default DropdownBind