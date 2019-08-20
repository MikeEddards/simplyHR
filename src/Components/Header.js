import React from 'react'
import logo from '../assets/simplylogo.png'
import AddEmployee from './AddEmployee'

export default function Header() {
    return (
        <header>
            <div className='logo'>
                <img src={logo} alt="simply employee managment" />
            </div>
            <AddEmployee />
        </header>
    )
}
