import React, { useEffect } from 'react'
import "./candidateprofile.css"
import Navbar from '../../components/LoginNavbar/LoginNavbar.js';
import { useState } from 'react';
import { useParams } from 'react-router-dom';


const CandidateProfile = () => {
     const [connectedFlag, setConnectedFlag] = useState(false)
     const [formData, setFormData] = useState({
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
          date_of_birth: '',
          info: '',
          gender: '',
          ethnicity: '',
          school_name: '',
          graduation_date: '',
          field_of_study: '',
          website: '',
          resume_file: null,
          account_created: '',
          profile_picture: null,
     });
     const candidateId  = "3"
     const JWT = sessionStorage.getItem("JWT")
     const handleConnect = () => {
          const params = {employerId : '', candidateId : ''}  
          params.employerId = sessionStorage.getItem("id") 
          params.candidateId = candidateId
          
          fetch('http://127.0.0.1:5002/connection', {
               method: 'POST',
               headers: { 'Authorization': `${JWT}`, 'Content-Type': "application/json" },
               body: JSON.stringify(params) 
          }).then((res) => res.json()).then((data) => {
               console.log(data)
               setFormData(data.candidate)

          }).catch(error => console.log("log:" + error))
          setConnectedFlag(true)
     }

     const handleRemove = () => {
          setConnectedFlag(false)
     }
     // const { candidateId } = useParams()

     useEffect(() => {
          const JWT = sessionStorage.getItem("JWT")
          fetch(`http://127.0.0.1:5002/candidate/${candidateId}`, {
               method: 'GET',
               headers: { 'Authorization': `${JWT}`, 'Content-Type': "application/json" }
          }).then((res) => res.json()).then((data) => {
               console.log(data)
               setFormData(data.candidate)

          }).catch(error => console.log("log:" + error))
     }, [])

     return (
          <div>
               <Navbar />
               <div className="candidate-profile">
                    <div className="profile-picture">
                         <img src={formData.profile_picture} alt="Profile" />
                    </div>
                    <div className="profile-details">
                         <h2 style={{ fontSize: "36px", fontFamily: "Georgia", fontWeight: "bold", marginBottom: "20px" }}>{formData.first_name + " " + formData.last_name}</h2> { }
                         <p style={{ fontSize: "22px", margin: "-10px" }}>{formData.school_name} {formData.graduation_date}</p> {/* Adjust font size */}
                         <p style={{ fontSize: "22px" }}>{formData.field_of_study}</p> {/* Adjust font size */}
                         {/* <Connect/> */}

                         {
                              (sessionStorage.getItem("userType") == "employer" && !connectedFlag) &&

                              <button onClick={handleConnect}>Connect</button>

                         }
                         {
                              (sessionStorage.getItem("userType") == "employer" && connectedFlag) &&

                              <button onClick={handleRemove}>Remove</button>

                         }
                         <h3 >Biography:</h3>
                         <p style={{ fontSize: "18px" }}>{formData.info}</p> {/* Adjust font size */}
                         <div className="skills" style={{ fontSize: "18px" }}>
                              <h3>Skills:</h3>
                              
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default CandidateProfile;