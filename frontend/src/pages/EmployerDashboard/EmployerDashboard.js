import "./employerdashboard.css"
import { useEffect, useState } from "react"
import CandidateCard from "../../components/CandidateCard/CandidateCard.js";
import "./employerdashboard.css"
import Navbar from '../../components/Navbar/Navbar.js'
import { useNavigate } from "react-router-dom";

const EmployerDashboard = () => {

     const [candidates, setCandidates] = useState([{}])

     const JWT = sessionStorage.getItem("JWT")
     const navigate = useNavigate()

     useEffect(() => {
          fetch(`http://127.0.0.1:5002/candidates/${sessionStorage.getItem("id")}`, {
               method: 'POST',
               headers: { 'Authorization': `${JWT}`, 'Content-Type': "application/json" },
               body: ''
          }).then((res) => res.json()).then((data) => {
               console.log(data.candidates)
               setCandidates(data.candidates)

          }).catch(error => console.log("log:" + error))
     },
          [])


     return (
          <div>
               <Navbar />
               <div className="container">
                    {
                         candidates.map(candidate => (
                              <div className="grid-item" onClick={() => navigate(`/candidateprofile/${candidate.candidate_id}`)}>
                              <CandidateCard first_name={candidate.first_name} field_of_study={candidate.field_of_study} school_name={candidate.school_name} graduation_date={candidate.graduation_date} />
                              </div>
                         ))
                    }
               </div>
          </div>
     );
}

export default EmployerDashboard;