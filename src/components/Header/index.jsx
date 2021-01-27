import React from 'react'
import { Link } from 'react-router-dom';
import './index.css'
import User from '../../assets/img/user.png'

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className='header--logo'>
                <Link exact='true' to='/'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png' alt='Netflix'/>
                </Link>
            </div>
            <div className='header--user'>
                <a href='#'>
                    <img src={User} alt='Usuário'/>
                </a>
            </div>
        </header>
    )
}