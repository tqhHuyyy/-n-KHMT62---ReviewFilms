// Xuat ra Logo
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../images/logo.png'
export class LogoComponent extends Component {
    render() {
        return (
            <div className="navBar-logo">
                <Link to="/" style={{display:'flex',minHeight:100}}><img className="img-logo" src={Logo} alt="" /></Link>
            </div>
        )
    }
}

export default LogoComponent
