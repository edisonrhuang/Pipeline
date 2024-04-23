import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar.js'
import { useNavigate } from 'react-router-dom';

import "./employerupdate.css"
import "./Button.css"

const EmployerUpdate = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        company_name: ''
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleDelete = (e) => {
        fetch(`http://127.0.0.1:5002/employer/${sessionStorage.getItem('id')}`, {
            method: 'DELETE',
            headers: { 'Authorization': `${JWT}`, 'Content-Type': "application/json" },
        }).then((res) => res.json()).then((data) => {
            
            navigate("/login")
        }).catch(error => console.log("log:" + error))
    }
    const JWT = sessionStorage.getItem('JWT')

    useEffect(() => {
        console.log("Asda")

        fetch(`http://127.0.0.1:5002/employer/${sessionStorage.getItem('id')}`, {
            method: 'GET',
            headers: { 'Authorization': `${JWT}`, 'Content-Type': "application/json" },
        }).then((res) => res.json()).then((data) => {
            setFormData(data.employer)
            console.log(data)

        }).catch(error => console.log("log:" + error))
    }, [])

    const handleSubmit = (e) => {
        console.log(formData)
        fetch(`http://127.0.0.1:5002/employer/${sessionStorage.getItem('id')}`, {
            method: 'PUT',
            headers: { 'Authorization': `${JWT}`, 'Content-Type': "application/json" },
            body: JSON.stringify(formData)
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            navigate("/employerprofile")
        }).catch(error => console.log("log:" + error))

    }
    return (
        <div style={{ textAlign: 'center', fontFamily: 'Georgia' }}>
            <Navbar />
            <h1 style={{ marginTop: '175px' }}>
                Update Your Employer Account
            </h1>
            <p>
                Update the details of your account.
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
                <input type="text" name="company_name" value={formData.company_name} onChange={handleChange}
                    style={{ marginTop: '10px', marginLeft: '12px' }} placeholder="Company" />
            </label>
            <br />
            <br />
            <br />
            <label>
                Profile Picture:
                <input type="file" name="profile_picture" accept="image/*" onChange={handleChange}
                    style={{ marginTop: '10px', marginLeft: '12px' }} />
            </label>
            <br />
            <br />
            <button className="button" onClick={handleSubmit}>Submit</button>
            <br />
            <br />
            <br />
            <button className="delete" onClick={handleDelete}>Delete</button>
        </div>
    );
};

function getDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


export default EmployerUpdate;
