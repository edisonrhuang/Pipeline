import { useEffect } from "react"
import { useState } from "react"
import Navbar from '../../components/CandidateNavbar/CandidateNavbar.js'
const CandidateDashboard = () => {

     const [formData, setFormData] = useState({
          first_name: '',
          last_name: '',
          email: '',
          company_name: '',
          info: ''
     });
     const [employers, setEmployers] = useState([{}])
     const JWT = sessionStorage.getItem("JWT")

     useEffect(() => {
          fetch(`http://127.0.0.1:5002/employers/${sessionStorage.getItem("id")}`, {
               method: 'GET',
               headers: { 'Authorization': `${JWT}`, 'Content-Type': "application/json" }
          }).then((res) => res.json()).then((data) => {

               setEmployers(data.employers)
               console.log(data.employers)
          }).catch(error => console.log("log:" + error))
     }, [])

     return (
          <div>
               <Navbar />
               {
                    employers.map(employer => (
                         <div>{employer.first_name + " " + employer.last_name + " from " + employer.company_name + " has connected with you! Their email is " + employer.email}</div>
                    ))
               }
          </div>
     );
}

export default CandidateDashboard;