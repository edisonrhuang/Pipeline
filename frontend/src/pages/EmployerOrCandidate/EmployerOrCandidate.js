import React from 'react';
import logoImage from "./assets/logo.png"
import './EmployerOrCandidate.css'
import { useNavigate } from 'react-router-dom';

const EmployerOrCandidate = () => {

    const handleEmployer = () => {

        // fetch('http://127.0.0.1:5002/login', {
        //     method: 'POST',
        //     headers: { 'Authorization': `${JWT}`, 'Content-Type': "application/json" },
        //     body: ''
        // }).then((res) => res.json()).then((data) => {
        //     sessionStorage.setItem('JWT', JWT);
        //     navigate("/employerorcandidate")
        // }).catch(error => console.log("log:" + error))
        navigate("/employercreate")
    }

    const handleCandidate = () => {
        navigate("/candidatecreate")
    }
    const navigate = useNavigate()


    return (
        //<form onSubmit={handleSubmit} method="POST">
        <div style={{ backgroundImage: 'url(' + require('./assets/img.webp') + ')', backgroundSize: "cover", minHeight: "100vh" }}>
            <form style={{ textAlign: 'center', fontFamily: 'Georgia' }}>
                <div className="center">
                    <img src={logoImage} alt="Pipeline" style={{ height: '450px', marginRight: '50px', marginTop: '-50px' }} /> <br />
                    <label className="text_label">
                        Join a network of professionals and budding talent!
                    </label>
                    <br />
                    <br />
                    <button className="button-30" onClick={handleEmployer}>Employer</button>
                    <br />
                    <br />
                    <br />
                    <label className="or_label">or</label>
                    <br />
                    <br />
                    <button className="button-30" onClick={handleCandidate}>Candidate</button>
                </div>
            </form>
        </div>
    );
}

export default EmployerOrCandidate;
