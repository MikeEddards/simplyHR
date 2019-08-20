import React, { Component } from 'react'

export default class AddEmployee extends Component {
    state = {
        add: false,
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    }
    render() {
        return (
            
            <div className='addEmployee'>
                <button className='addEmployeeBtn'>New Employee</button>
            </div>
           
        )
    }
}
