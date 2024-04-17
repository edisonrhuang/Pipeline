import React, { Component } from 'react';
import './Button.css'; // Tell webpack that Button.js uses these styles

class Button extends Component {
  render() {
    
    return <button className="button">Submit</button>;
  }
}

export default Button