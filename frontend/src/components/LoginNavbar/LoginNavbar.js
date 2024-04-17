import React from 'react';
import logoImage from "./assets/logo.png"

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
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <img src={logoImage} alt="Pipeline" style={{height: '300px', marginRight: '0.2rem', marginLeft: '-3rem'}} /> 
        <div>
          <button style={{
            padding: '8px 16px',
            fontSize: '1rem',
            cursor: 'pointer',
            backgroundColor: '#f0f0f0',
            border: 'none',
            borderRadius: '5px',
          }}>Log In</button>
        </div>
      </nav>
    );
  }
  
  export default Navbar;