import React from 'react'
import Navbar from './snippets/navbar';
import logo from '../assets/logo.svg';

const HomePage = () => {
    document.title = "Home";

    return(
        <section style={{"background":"#420963"}}>
        <Navbar />
        <div className="main">
        <h1 style={{"textAlign":"center"}}>Hello From React</h1>
        <img className="logo" src={logo} alt="logo"/>
        </div>
        </section>
    )
}

export default HomePage;