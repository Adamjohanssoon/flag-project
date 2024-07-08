import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from './Theme'
import './Navbar.css'

import darkLogo from '../assets/techover-logo-dark.png'
import lightLogo from '../assets/techover-logo.png'
import lightMode from '../assets/moon-bordered.svg'
import darkMode from '../assets/moon.svg'


const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    const logo = theme === 'light' ? darkLogo : lightLogo;
    const modeIcon = theme === 'light' ? lightMode : darkMode;
    const modeText = theme === 'light' ? 'Dark Mode' : 'Light Mode';



    return (
        <div className="Navbar">
            <NavLink to="/" className="nav-links">
            <h2>The Flag App</h2>
            </NavLink>
            <NavLink to="/" className="nav-links">
            <img src={logo} alt="Techover logo" className="Navbar-logo" />
            </NavLink>
            <div className="darkMode-container" onClick={toggleTheme}>
                <img src={modeIcon} alt="Dark Mode" className="darkmode-logo" />
                <h3>{modeText}</h3>
            </div>
        </div>
    )
}

export default Navbar
