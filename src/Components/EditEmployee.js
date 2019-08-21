import React, { Component } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSlash } from '@fortawesome/free-solid-svg-icons' 
import { AsYouType } from 'libphonenumber-js'

export default class EditEmployee extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        id: ''
    }
    
    componentDidMount(){
        const {first_name, last_name, email, phone, id} = this.props.employee

        this.setState({
            first_name,
            last_name,
            email,
            phone,
            id
        })
    }
    handleInputChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleCancel = (e) => {
        e.preventDefault()
        this.setState({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            id: ''
        })
        this.props.editCancel()
    }
    //submits delete to the server
    handleDelete = (e) => {
        e.preventDefault()
        const confirm = window.confirm('Click ok to remove employee')
        if(confirm === true){
            axios.delete(`/api/employee/${this.state.id}`).then(this.setState({
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                id: ''
            })).then(this.props.afterEdit())
        }else{
            this.setState({
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                id: ''
            })
            this.props.editCancel()
        }
        
    }
    //submits employee edit to the server
    handleSubmit = (e) => {
        e.preventDefault()
        const {
            first_name,
            last_name,
            email,
            phone
        } = this.state
        axios.put(`/api/employee/${this.state.id}`,{
            first_name,
            last_name,
            email,
            phone
        }).then(this.setState({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            id: ''
        })).then(this.props.afterEdit())
    }
    //this changes the layout of the phone number as its typed
    handleChangePhone = (e) => {
        const phone1 = new AsYouType('US').input(e.target.value)
        this.setState({
            phone: phone1
        })
    }
    render() {

        return (
            <div className='editInnerBox'>
                <h1>Edit Employee</h1>
                    <h2>Id Number: {this.state.id}</h2>    
                <form> 
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
                    <div className='delete' onClick={this.handleDelete} >
                        
                    <FontAwesomeIcon 
                    className='icon'
                        icon={faUserSlash}
                        color='#FF5A5F'
                        size='2x'
                    />
                    </div>
                    
                </form>
            </div>
        )
    }
}
