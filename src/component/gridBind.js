import React from 'react';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import Pagination from "react-js-pagination";
import Modal from 'react-awesome-modal';
import 'bootstrap/dist/css/bootstrap.css';
import Calendar from 'ciqu-react-calendar';
import moment from 'moment';
// import ReactExport from "react-data-export";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

//  const ExcelFile = ReactExport.ExcelFile;
//  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
//  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

var Loader = require('react-loader');
class Gridbind extends React.Component {
    Editflag = false;

    constructor(props) {
        super(props);
        this.state = {
            updatecheck: false,
            Addcheck: true,
            gridBind: [],
            test: [],
            States: [],
            visible: false,
            loaded: false,
            stateId: '',
            lists: [],
            isChecked: false,
            value: moment()
        }
        // var today = new Date();
        //this.lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

        this.state.lists = [];
        this.AddStudent = this.AddStudent.bind(this);
        this.EditStudentDetails = this.EditStudentDetails.bind(this);
        this.UpdateStudent = this.UpdateStudent.bind(this);
        this.DeleteStudent = this.DeleteStudent.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.stateChange = this.stateChange.bind(this);
        this.componentDidMount();
    }


    //search records
    handleChange(e) {
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];
        let backvalues = [];
        backvalues = this.state.gridBind;
        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.state.gridBind;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.StudentName.toLowerCase();
                // change search term to lowercase
                const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            this.componentDidMount();
            // If the search bar is empty, set newList to original task list
            newList = this.state.gridBind;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            gridBind: newList
        });
    }
    studentNamechange(event) {
        this.setState({
            StudentName: event.target.value
        });

    }
    onCelenderChange(event) {
        console.log(event.format('YYYY-MM-DD'))
        this.setState({
            value: event
        });

    }
    disabledDate = (currentDate, inputValue) => {
        return false
    }
    onOpenChange = (status) => {
        console.log('open status: ' + status)
    }

    studentAddreesschange(event) {
        this.setState({
            SAddrees: event.target.value
        });

    }
    studentMarkschange(event) {
        this.setState({
            SMarks: event.target.value
        });
    }

    openModal(e) {
        this.setState({
            StudentID: e.StudentId,
            StudentName: e.StudentName,
            SAddrees: e.SAddrees,
            SMarks: parseInt(e.SMarks, 10),
            visible: true,
            StateName: e.StateName
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    //page load
    componentDidMount() {
        this.studentDetails();
    }

    //dropdown event change event
    stateChange(e) {
        this.setState({
            stateId: e.target.value
        })
    }

    stateDropdown() {
        fetch('http://localhost:5000/userDetails/states/').then((stateResponse) => {
            return stateResponse.json();
        }).then((items) => {
            console.log(items);
            const optionItems = items.recordset.map(
                item => {
                    return {
                        value: item.StateId,
                        display: item.StateName
                    }

                });
            this.setState({
                States: optionItems,
                loaded: true
            })
        });
    }

    studentDetails() {
        fetch('http://localhost:5000/Student/').then((resposne) => {
            return resposne.json();
        }).then((items) => {
            this.setState({
                StudentId: 0,
                StudentName: '',
                SAddrees: '',
                SMarks: 0,
                States: '',
                gridBind: items.recordset,
                gender: ''
            });
            this.stateDropdown();
        })
    }
    // Edit student details
    EditStudentDetails(e) {
        this.Editflag = true;
        console.log(e.target.id);
        const studentDetails = this.state.gridBind.find(function (student) {
            if (student.StudentId == e.target.id) {
                return student;
            }
        });
        if (studentDetails.Options === "1") {
            this.setState({ isChecked1: true, isChecked2: false, isChecked3: false })
        }
        if (studentDetails.Options === "2") {
            this.setState({ isChecked1: false, isChecked2: true, isChecked3: false })
        }
        if (studentDetails.Options === "3") {
            this.setState({ isChecked1: false, isChecked2: false, isChecked3: true, })
        }
        if (studentDetails.Options.length > 1) {
            let mm = studentDetails.Options.split(',');

            if (mm[0] === "1" && mm[1] === "2") {
                this.setState({ isChecked1: true, isChecked2: true, isChecked3: false })
            }
            if (mm[0] === "1" && mm[2] === "3") {
                this.setState({ isChecked1: true, isChecked2: false, isChecked3: true })
            }

            if (mm[0] === "2" && mm[1] === "1") {
                this.setState({ isChecked1: true, isChecked2: true, isChecked3: false })
            }
            if (mm[0] === "2" && mm[1] === "3") {
                this.setState({ isChecked1: false, isChecked2: true, isChecked3: true })
            }

            if (mm[0] === "3" && mm[1] === "1") {
                this.setState({ isChecked1: true, isChecked2: true, isChecked3: true })
            }
            if (mm[0] === "3" && mm[1] === "2") {
                this.setState({ isChecked1: false, isChecked2: true, isChecked3: true })
            }

            if (mm[0] === "1" && mm[1] === "2" && mm[2] === "3") {
                this.setState({ isChecked1: true, isChecked2: true, isChecked3: true })
            }

        }
        this.setState({
            updatecheck: true,
            Addcheck: false,
            StudentId: parseInt(e.target.id),
            StudentName: studentDetails.StudentName,
            SAddrees: studentDetails.SAddrees,
            SMarks: studentDetails.SMarks,
            stateId: studentDetails.StateId,
            gender: studentDetails.Gender,
            Options: studentDetails.Options,
            lists: studentDetails.Options

        });
    }
    //update student details
    UpdateStudent(e) {
        console.log(e.target.id);
        let data = {
            StudentID: this.state.StudentId,
            StudentName: this.state.StudentName,
            SAddrees: this.state.SAddrees,
            StateId: parseInt(this.state.stateId),
            SMarks: parseInt(this.state.SMarks, 10),
            gender: this.state.gender,
            Options: this.state.options.length == 2 ? this.state.options[0] : this.state.options,
        };
        let StudentResults = {};
        fetch('http://localhost:5000/userDetails/StudentUpdate',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)

            }).then(resposne => {
                return resposne.json()

            })
            .then((items) => {
                StudentResults = items.recordsets[0];
                if (StudentResults.length > 0) {
                    // alert('Record Updated sucessfully!');
                    this.componentDidMount();
                }
                else {
                    alert('Fail to updated to record!');
                }

            }).catch((err) => {
                console.log(err);

            });
    }

    //Delete student details
    DeleteStudent(e) {
        console.log(e.target.id);
        let data = {
            StudentID: parseInt(e.target.id)
        };
        let StudentResults = {};
        fetch('http://localhost:5000/userDetails/StudentDelete',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)

            }).then(resposne => {
                return resposne.json()

            })
            .then((items) => {
                StudentResults = items.recordsets[0];
                //this.setState({ gridBind: gridresult });
                if (StudentResults.length > 0) {
                    // alert('Record Deleted sucessfully!');
                    this.componentDidMount();
                }
                else {
                    alert('Fail to delete record!');
                }

            }).catch((err) => {
                console.log(err);

            });
    }
    //Radio button change event    
    Handlegender(e) {
        this.setState({
            gender: e.currentTarget.value
        })
    }
    //Checkbox change event
    Handleoptions(e) {
        if (this.Editflag == true) {
            this.Editvalidations(e);
        }
        else {
            this.Addvalidations(e);
        }
    }
    Addvalidations(e) {
        let checkedvalue = e.target.value;
        this.state.lists.push(e.target.value);
        if (checkedvalue === "1") {
            this.setState({
                isChecked1: e.target.checked ? true : false,
                options: this.state.lists,
            })
        }
        else if (checkedvalue === "2") {
            this.setState({
                isChecked2: e.target.checked ? true : false,
                options: this.state.lists,
            })
        }
        else if (checkedvalue === "3") {
            this.setState({
                isChecked3: e.target.checked ? true : false,
                options: this.state.lists,
            })
        }
    }
    Editvalidations(e) {
        let checkedvalue = e.target.value;
        let mm = this.state.lists + ',' + e.target.value;
        let ss = this.state.lists.slice(0, e.target.value)
        console.log(ss);
        if (checkedvalue === "1") {
            this.setState({
                isChecked1: e.target.checked ? true : false,
                options: e.target.checked ? mm : ss
            })
        }
        else if (checkedvalue === "2") {
            this.setState({
                isChecked2: e.target.checked ? true : false,
                options: e.target.checked ? mm : ss,
            })
        }
        else if (checkedvalue === "3") {
            this.setState({
                isChecked3: e.target.checked ? true : false,
                options: e.target.checked ? mm : ss,
            })
        }
    }

    AddStudent1() {
        //return <Redirect to='/home' />
        // this.props.history.push('/home');
        //this.props.history.push('/contact');
    }

    //Add student details
    AddStudent() {
        let data = {
            StudentName: this.state.StudentName,
            SAddrees: this.state.SAddrees,
            SMarks: parseInt(this.state.SMarks, 10),
            StateID: parseInt(this.state.stateId),
            Gender: this.state.gender,
            Options: this.state.options,
            SDate: new Date(this.state.value)
        };
        let gridresult = {};
        fetch('http://localhost:5000/userDetails/StudentsInsertion',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)

            }).then(resposne => {
                return resposne.json()

            })
            .then((items) => {
                gridresult = items.recordsets[0];
                //this.setState({ gridBind: gridresult });
                if (gridresult.length > 0) {
                    this.setState({ isChecked1: false, isChecked2: false, isChecked3: false });
                    this.state.lists = [];
                    // alert('Record Inserted.please login again!');
                    ToastsStore.success('Record Inserted.please login again!');
                    this.componentDidMount();
                }
                else {
                    // alert('Fail to Inserted to record!');
                    ToastsStore.error('Fail to Inserted to record!!');
                }

            }).catch((err) => {
                console.log(err);

            });

    }

    render() {
        const { onCelenderChange, onOpenChange, disabledDate } = this;
        var rows = [];
        this.state.gridBind.forEach(function (item) {
            rows.push(
                <tr>
                    <td>{item.StudentId}</td>
                    <td>{item.StudentName}</td>
                    <td>{item.SAddrees}</td>
                    <td>{item.SMarks}</td>
                    <td>{item.StateName}</td>
                    <td>{item.Gender}</td>
                    <td>{item.Options}</td>
                    <td>
                        <button className="btn-primary" id={item.StudentId} onClick={() => this.openModal(item)} >View</button> &nbsp;
                        <button className="btn-primary" id={item.StudentId} onClick={this.EditStudentDetails}>Edit</button> &nbsp;
                        <button className="btn-primary" id={item.StudentId} onClick={this.DeleteStudent}>Delete</button></td>
                </tr>
            );
        }.bind(this));
        return (

            <div className="table-responsive">

                <h3>Student CRUD operations..</h3>
                <h4>Add/Edit Student Details</h4>
                <div>
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            <label>Student Name:</label>
                            <input type="text" className="form-control" placeholder="Student Name" value={this.state.StudentName} onChange={this.studentNamechange.bind(this)}></input>
                        </div>
                        <div className="form-group col-md-5">
                            <label>Adrees:</label>
                            <input type="text" placeholder="Adrees" className="form-control" value={this.state.SAddrees} onChange={this.studentAddreesschange.bind(this)}></input>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            <label>Marks:</label>
                            <input type="text" placeholder="Marks" className="form-control" value={this.state.SMarks} onChange={this.studentMarkschange.bind(this)}></input>
                        </div>
                        <div className="form-group col-md-5">
                            <label>State:</label>
                            {this.state.States ?
                                <select onChange={this.stateChange} value={this.state.stateId} class="custom-select mb-3">
                                    {this.state.States.map((team) => <option key={team.value} value={team.value}>{team.display}</option>)}
                                </select> : null
                            }
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            <label>Gender:</label>
                            <input type="radio" value="M" name="gender" checked={this.state.gender === "M"} onClick={this.Handlegender.bind(this)} /> Male
                        <input type="radio" value="F" name="gender" checked={this.state.gender === "F"} onClick={this.Handlegender.bind(this)} /> Female
                    </div>
                        <div className="form-group col-md-5">
                            <label>Dates:</label>
                            <Calendar className="datepicker"
                                onChange={this.onCelenderChange.bind(this)}
                                value={this.state.value}
                                allowClear={true}
                                disabled={false}
                                placeholder={'please input date'}
                                format={'YYYY-MM-DD'}
                                onOpenChange={onOpenChange}
                                disabledDate={disabledDate}

                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            <label>Options:</label>
                            <input type="checkbox" value="1" name="options" checked={this.state.isChecked1} onChange={this.Handleoptions.bind(this)} /> Inter
                        <input type="checkbox" value="2" name="options" checked={this.state.isChecked2} onChange={this.Handleoptions.bind(this)} /> Degree
                        <input type="checkbox" value="3" name="options" checked={this.state.isChecked3} onChange={this.Handleoptions.bind(this)} /> PG
                    </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-5">
                            {this.state.updatecheck ? <input type="button" value="Update" className="btn btn-primary" onClick={this.UpdateStudent} /> : null}
                            {this.state.Addcheck ? <input type="button" className="btn btn-primary" value="Add" onClick={this.AddStudent} /> : null}
                        </div>
                    </div>

                </div>
                <h4>View Student Details</h4>
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label>Filter by Student Name</label>
                        <input type="text" className="form-control" onChange={this.handleChange} placeholder="Search..." />
                    </div>
                    <div className="form-group col-md-5">
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="btn btn-primary cssalignment"
                            table="table-to-xls"
                            filename="Studentxls"
                            sheet="Studentxls"
                            buttonText="Downloading For XML Data" />
                    </div>
                </div>
                <table className="table table-striped" id="table-to-xls">
                    <thead className="thead-light">
                        <tr className="table-active">
                            <th className="table-primary">
                                StudentId:
                            </th>
                            <th>
                                StudentName:
                    </th>
                            <th>
                                Addrees:
                    </th>
                            <th>
                                Marks:
                    </th>
                            <th>
                                State
                    </th>
                            <th>
                                Gender
                    </th>
                            <th>
                                Options
                    </th>
                            <th>
                                Action
                    </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <Pagination
                    hideDisabled
                    activePage={3}
                    itemsCountPerPage={5}
                    totalItemsCount={200}
                    onChange={this.handlePageChange} />
                <div className="toasterposition" >
                    <ToastsContainer
                        store={ToastsStore} closeButton={true} autoClose={80000} />
                </div>
                <Loader loaded={this.state.loaded}>
                </Loader>

                <div visible={this.state.visible} class="modal" id="myModal">
                    <div class="modal-dialog">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h4 class="modal-title">CRUD operation model view popup..</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div class="modal-body">
                                <div>
                                    <span>Student Name:</span>
                                    <span>{this.state.StudentName}</span>
                                </div>
                                <div>
                                    <span>Addrees:</span>
                                    <span>{this.state.SAddrees}</span>
                                </div>
                                <div>
                                    <span>Marks:</span>
                                    <span>{this.state.SMarks}</span>
                                </div>
                                <div>
                                    <span>State:</span>
                                    <span>{this.state.StateName}</span>
                                </div>
                                <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>

                            </div>


                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

                <section>
                    <Modal class="modal" visible={this.state.visible} effect="fadeInUp" >
                        <div class="modal-dialog">
                            <div class="modal-content">


                                <div class="modal-header">
                                    <h4 class="modal-title">CRUD operation model view popup..</h4>
                                    <button type="button" onClick={() => this.closeModal()} class="close" data-dismiss="modal">&times;</button>
                                </div>

                                <div class="modal-body">
                                    <div>
                                        <span>Student Name:</span>
                                        <span>{this.state.StudentName}</span>
                                    </div>
                                    <div>
                                        <span>Addrees:</span>
                                        <span>{this.state.SAddrees}</span>
                                    </div>
                                    <div>
                                        <span>Marks:</span>
                                        <span>{this.state.SMarks}</span>
                                    </div>
                                    <div>
                                        <span>State:</span>
                                        <span>{this.state.StateName}</span>
                                    </div>
                                    <button className="btn-success" href="javascript:void(0);" onClick={() => this.closeModal()}>Close</button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </section>
            </div>

        )
    }
}
export default Gridbind;