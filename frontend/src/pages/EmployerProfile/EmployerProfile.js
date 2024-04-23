import React, { useEffect } from 'react'
import "./employerprofile.css"
import img from "./bivashPic.jpg"
import logoImage from "./logo.png"
import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar.js'
import { useNavigate } from 'react-router-dom';
// const profileData = {
//      name: 'Bivash Oli',
//      company: 'Virginia Tech',
//      email: 'bivasholi@vt.edu',
// };


const EmployerProfile = () => {
     const JWT = sessionStorage.getItem('JWT')
     const [profileData, setProfileData] = useState({})
     const navigate = useNavigate()
     const handleEdit = () => {
          navigate("/employerupdate")
     }
     useEffect(() => {
          fetch(`http://127.0.0.1:5002/employer/${sessionStorage.getItem('id')}`, {
               method: 'GET',
               headers: { 'Authorization': `${JWT}`, 'Content-Type': "application/json" }
          }).then((res) => res.json()).then((data) => {
               console.log(data.employer)
               setProfileData(data.employer)
          }).catch(error => console.log("log:" + error))
     }, [])

     return (
          <div className="profile">

               <Navbar />
               <div id="content">
                    <div id="white" className="half">
                         <div id="p_info">
                              <h1>asd</h1>
                              <h1 id="name">{profileData.first_name + " " + profileData.last_name}</h1>
                              <p><b>Company:</b> {profileData.company_name}</p>
                              <p><b>Email:</b> {profileData.email}</p>
                              <br />
                              <br />
                              <br />

                              {
                         (sessionStorage.getItem("userType") == "employer") &&

                         <button onClick={handleEdit}>Edit</button>

                    }
                         </div>
                    </div>
                    <div id="purple" className="half">
                         <img src={img} alt="image" />
                    </div>
                   
               </div>


          </div>
     );
}

export default EmployerProfile;