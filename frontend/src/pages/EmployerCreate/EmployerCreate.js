import React, { useState, useEffect } from 'react';
import Navbar from '../../components/LoginNavbar/LoginNavbar.js';

const CreateEmployer = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        company_name: '',
        info: ''
        // profile_picture: null
    });


    const handleSubmit = (e) => {
        const JWT = sessionStorage.getItem("JWT")
        console.log(formData)
        fetch('http://127.0.0.1:5002/employer', {
            method: 'POST',
            headers: { 'Authorization': `${JWT}`, 'Content-Type': "application/json" },
            body: JSON.stringify(formData)
        }).then((res) => res.json()).then((data) => {
            console.log(data)
        }).catch(error => console.log("log:" + error))
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <div style={{ textAlign: 'center', fontFamily: 'Georgia' }}>
            <Navbar />
            <h1 style={{ marginTop: '175px' }}>
                Create your account
            </h1>
            <p>
                Create an account to connect with potential employees!
            </p>
            <br />
            <label>
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange}
                    style={{ marginLeft: '12px' }} placeholder="First Name" />
            </label>
            <br />
            <label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange}
                    style={{ marginTop: '10px', marginLeft: '12px' }} placeholder="Last Name" />
            </label>
            <br />
            <label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                    style={{ marginTop: '10px', marginLeft: '12px' }} placeholder="Email" />
            </label>
            <br />
            <label>
                <input type="text" name="company_name" value={formData.company_name} onChange={handleChange}
                    style={{ marginTop: '10px', marginLeft: '12px' }} placeholder="Company" />
            </label>
            <br />
            <br />
            <br />
            <label>
                Profile Picture:
                <input type="file" name="profile_picture" accept="image/*" 
                    style={{ marginTop: '10px', marginLeft: '12px' }} />
            </label>
            <br />
            <br />
            <button className="button" onClick={handleSubmit}>Submit</button>    
        </div>
    
    );
};


export default CreateEmployer;
