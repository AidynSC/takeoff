import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
    }

    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
        setCurrentUser(auth.userName)
    }, [auth.userName])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand" href="#">Приветствую, {currentUser}!</span>
                <button className="btn btn-outline-success d-flex" onClick={logoutHandler}>Выйти</button>
            </div>
        </nav>
    )
}