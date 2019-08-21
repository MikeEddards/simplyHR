import React, { Component } from 'react'
import axios from 'axios'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons' 

export default class Table extends Component {
    state = {
        employees: [],
        onEdit: null,
        slide: 'none'
    }
componentDidMount(){
    axios.get('/api/employees').then(res =>{
        this.setState({
            employees: res.data
        })
    })
}
onEdit = (id) => {

    this.setState({
        onEdit: this.state.employees[id],
        slide: 'editContainer'
    })
}
 
afterEdit = () =>{
    setTimeout(() => {
        axios.get('/api/employees').then(res =>{
            this.setState({
                employees: res.data,
                onEdit: null,
                slide: 'none'
            })
        })
    }, 1000)

}
afterAdd = () => {
    setTimeout(() => {
        axios.get('/api/employees').then(res =>{
            this.setState({
                employees: res.data,
                onEdit: null,
                slide: 'none'
            })
        })
    }, 1000)
}
editCancel = (e) =>{

    this.setState({
        onEdit: null,
        slide: 'none'
    })
}

    render() {
        // this maps over all of the employees and adds them to the table
        let employee = this.state.employees.map((emp,i) => (
            <tr>
                <td>{emp.first_name}</td>
                <td>{emp.last_name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.id}</td>
                <td><FontAwesomeIcon 
                className='edit'
                onClick={() => this.onEdit(i)}
                icon={faUserEdit}
                color='#FF5A5F'
                size='1x'
                /></td>
            </tr>
        ))
        return (
            <>
       
            <AddEmployee add={() => this.afterAdd()} />
            
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Id</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee}
                    </tbody>
                </table>
           
            <div className={this.state.slide}>
                {this.state.onEdit && 
                <EditEmployee 
                employee={this.state.onEdit}
                afterEdit={() => {this.afterEdit()}}
                editCancel={() => {this.editCancel()}}
                />}
                
            </div>
            

            </>
        )
    }
}
