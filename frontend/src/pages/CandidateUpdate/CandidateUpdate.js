import React, { useState, useEffect } from 'react';
import Navbar from '../../components/LoginNavbar/LoginNavbar.js';
import { useNavigate } from 'react-router-dom';
import {format} from 'date-fns'
import './Button.css'

const CandidateUpdate = () => {
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
     const JWT = sessionStorage.getItem('JWT')

     useEffect(() => {
          fetch(`http://127.0.0.1:5002/candidate/${sessionStorage.getItem('id')}`, {
               method: 'GET',
               headers: { 'Authorization': `${JWT}`, 'Content-Type': "application/json" },
          }).then((res) => res.json()).then((data) => {
               const candidateData = data.candidate
               candidateData.date_of_birth = format(new Date(candidateData.date_of_birth), "yyyy-MM-dd")
               candidateData.graduation_date = format(new Date(candidateData.graduation_date), "yyyy-MM-dd")

               console.log(JSON.parse(JSON.stringify(data.candidate)))
               delete candidateData['candidate_id']
               delete candidateData['account_created']
               delete candidateData['skills']
               console.log(JSON.stringify(data.candidate))

               setFormData(data.candidate)
          }).catch(error => console.log("log:" + error))
     }, [])
     const navigate = useNavigate()

     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleSubmit = (e) => {
          console.log(formData)
          fetch(`http://127.0.0.1:5002/candidate/${sessionStorage.getItem('id')}`, {
               method: 'PUT',
               headers: { 'Authorization': `${JWT}`, 'Content-Type': "application/json" },
               body: JSON.stringify(formData)
          }).then((res) => res.json()).then((data) => {
               navigate(`/candidateprofile/${sessionStorage.getItem('id')}`)
          }).catch(error => console.log("log:" + error))

     }

     return (

          <div onSubmit={handleSubmit} method="POST" style={{ textAlign: 'center', fontFamily: 'Georgia' }}>
               <Navbar />
               <h1 style={{ marginTop: '50px' }}>
                    Update Your Candidate Profile
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
                    <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange}
                         style={{ marginTop: '10px', marginLeft: '12px' }} placeholder="Phone Number" />
               </label>
               <br />
               <label>
                    <textarea name="info" value={formData.info} onChange={handleChange}
                         style={{ marginTop: '10px', marginLeft: '12px', width: "250px", height: "100px" }} placeholder="Tell us about yourself!" />
               </label>
               <br />
               <label>
                    Gender:
                    <select name="gender" value={formData.gender} onChange={handleChange}
                         style={{ marginTop: '10px', marginLeft: '12px' }}>
                         <option value="">Select</option>
                         <option value="Male">Male</option>
                         <option value="Female">Female</option>
                         <option value="Prefer not to say">Prefer not to say</option>
                         <option value="Others">Others</option>
                    </select>
               </label>
               <br />
               <label>
                    <input type="text" name="field_of_study" value={formData.field_of_study} onChange={handleChange}
                         style={{ marginTop: '10px', marginLeft: '12px' }} placeholder="Field of Study" />
               </label>
               <br />
               <label>
                    <input type="text" name="website" value={formData.website} onChange={handleChange}
                         style={{ marginTop: '10px', marginLeft: '12px' }} placeholder="Website" />
               </label>
               <br />
               <label>
                    Profile Picture:
                    <input type="file" name="profile_picture" accept="image/*" onChange={handleChange}
                         style={{ marginTop: '10px', marginLeft: '12px' }} />
               </label>
               <br />
               <br />

               <br />
               <button className="button" onClick={handleSubmit}>Submit</button>
          </div>
     );
};

export default CandidateUpdate;
