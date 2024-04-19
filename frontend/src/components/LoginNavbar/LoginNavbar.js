import React from 'react';
import logoImage from "../Assets/logo.png"
import "../Navbar/navbar.css"

function Navbar() {
    return (
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.8rem 2rem',
        height: '60px',
        backgroundColor: '#ffffff', // White background
        color: 'purple',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
      }}>
        <img src={logoImage} alt="Pipeline" style={{height: '300px', marginRight: '0.2rem', marginLeft: '-3rem'}} /> 
        <div>
          <button className="login_button">Log In</button>
        </div>
      </nav>
    );
  }
  
  export default Navbar;