import React from 'react'
import logo from '../assets/simplylogo.png'


export default function Header() {
    
    return (
        <header>
            <div className='logo'>
                <img src={logo} alt="simply employee managment" />
            </div>
        </header>
    )
}
