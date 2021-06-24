import React from 'react'
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="container">
        <Link to="/">Home</Link>
        <Link to="/pokemon">API</Link>
        <Link to="/weather">Weather</Link>
        <Link to="/todo">Todo</Link>
        </nav>
    )
}

export default Navbar;