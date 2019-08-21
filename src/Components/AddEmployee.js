import React, { Component } from 'react'
import { AsYouType } from 'libphonenumber-js'
import axios from 'axios'

export default class AddEmployee extends Component {
    state = {
        addBtn: 'addEmployeeBtn',
        inputs: 'noDisplay',
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    }
handleInputChange = (e) =>{
    this.setState({
        [e.target.name]: e.target.value
    })
}
// this changes phone number layout as it is typed
handleChangePhone = (e) => {
    const phone1 = new AsYouType('US').input(e.target.value)
    this.setState({
        phone: phone1
    })
}
// submits new employee to the server
handleSubmit = (e) => {
    e.preventDefault()
    const {first_name,
        last_name,
        email,
        phone} = this.state

    axios.post('/api/employee',{
        first_name,
        last_name,
        email,
        phone
    }).then(
        this.setState({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            addBtn: 'addEmployeeBtn',
            inputs: 'noDisplay'
        })
    ).then(this.props.add())

}
// this changes state for the different classes for the container transition
handleAdd = (e) => {
    e.preventDefault()
    this.setState({
        addBtn: 'noDisplay',
        inputs: 'employeeForm'
    })
}
handleCancel = (e) => {
    e.preventDefault()
    this.setState({
        addBtn: 'addEmployeeBtn',
        inputs: 'noDisplay',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    })
}
    render() {

        return (
            <div className='addEmployee'>
                      <button className={this.state.addBtn} onClick={this.handleAdd}>New Employee</button>
                <div className={this.state.inputs}>
                    
                        <h1>New Employee</h1>
                    <form className='addForm'>
                        <input type="text"
                        name='first_name'
                        value={this.state.first_name}
                        onChange={this.handleInputChange}
                        placeholder='First Name'
                        />
                        <input type="text"
                        name='last_name'
                        value={this.state.last_name}
                        onChange={this.handleInputChange}
                        placeholder='Last Name'
                        />
                        <input type="email"
                        name='email'
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        placeholder='Email'
                        />
                        <input type="text"
                        name='phone'
                        value={this.state.phone}
                        onChange={this.handleChangePhone}
                        placeholder='Phone Number'
                        />
                        <button 
                        className='submitBtn'
                        onClick={this.handleSubmit}
                        >Submit</button>
                        <button className='cancelBtn' onClick={this.handleCancel}>Cancel</button>
                    </form>
                </div>
            </div>
           
        )
    }
}
