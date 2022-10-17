import * as React from 'react';
import { RouteComponentProps, StaticContext } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import * as EmployeeStore from '../store/Employee';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';

type EmployeeProps =
    EmployeeStore.EmployeeState // ... state we've requested from the Redux store
    & typeof EmployeeStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }> // ... plus incoming routing parameters
    & RouteComponentProps<{ mode: string }>

type Props<EmployeeProps> =
    EmployeeStore.EmployeeState // ... state we've requested from the Redux store
    & typeof EmployeeStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }> // ... plus incoming routing parameters
    & RouteComponentProps<{ mode: string }>

class Employee implements EmployeeStore.Employee {
    employeeId= "";
    name? = "";
    gender?= "";
    city?= "";
    department?="";
}
interface FetchEmployeeDataState {
    empList: Employee,
    loading: boolean,
    title: string,
}



export class AddEmployee extends React.Component<Props<EmployeeProps>, FetchEmployeeDataState> {
    constructor(props: Props<EmployeeProps>) {
        super(props);

        this.state = {
            title: "", loading: true, empList: new Employee
        };

        //fetch('api/Employee/GetCityList')
        //    .then(response => response.json() as Promise<Array<any>>)
        //    .then(data => {
        //        this.setState({ cityList: data });
        //    });

        var empid = 0;

        // This will set state for Edit employee
        if (empid > 0) {
            fetch('api/Employee/Details/' + empid)
                .then(response => response.json() as Promise<EmployeeStore.Employee>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, empList: data });
                });
        }

        // This will set state for Add employee
        else {
            this.state = {
                title: "Create", loading: false, empList: new Employee };
        }

        // This binding is necessary to make "this" work in the callback
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Employee</h3>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.
    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit employee.
        if (this.state.empList.employeeId) {
            fetch('api/Employee/Edit', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchemployee");
                })
        }

        // POST request for Add employee.
        else {
            fetch('api/Employee/Create', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchemployee");
                })
        }
    }

    // This will handle Cancel button click event.
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchemployee");
    }

    // Returns the HTML Form to the render() method.
    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="employeeId" value={this.state.empList.employeeId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empList.name} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Gender">Gender</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="gender" defaultValue={this.state.empList.gender} required>
                            <option value="">-- Select Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Department" >Department</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Department" defaultValue={this.state.empList.department} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="City">City</label>
                   
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}

export default connect(
    (state: ApplicationState) => state.employees, // Selects which state properties are merged into the component's props
    EmployeeStore.actionCreators // Selects which action creators are merged into the component's props
)(AddEmployee as any); // eslint-disable-line @typescript-eslint/no-explicit-any
