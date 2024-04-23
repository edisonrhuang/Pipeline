
import "./candidatesearch.css";
import Navbar from '../../components/Navbar/Navbar.js';
import { useEffect, useState } from "react"
import CandidateCard from "../../components/CandidateCard/CandidateCard.js";
import { useNavigate } from "react-router-dom";
// import data from dataFile

function CandidateSearch() {

     const [candidates, setCandidates] = useState([{}])

     const JWT = sessionStorage.getItem("JWT")
     const navigate = useNavigate()
     const handleClick = () => {

     }

     useEffect(() => {
          fetch(`http://127.0.0.1:5002/candidates`, {
               method: 'GET',
               headers: { 'Authorization': `${JWT}`, 'Content-Type': "application/json" },
          }).then((res) => res.json()).then((data) => {
               console.log(data)
               setCandidates(data)

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

                              <CandidateCard  first_name={candidate.first_name} field_of_study={candidate.field_of_study} school_name={candidate.school_name} graduation_date={candidate.graduation_date} />
                         </div>
                    ))
               }
          </div>
     </div>
          // <div className="CandidateSearch">
          //      <Navbar />
          //      <div className="left">
          //           {/* First search bar */}
          //           <label className="label" id="school" style={{ fontSize: "24px", textAlign: 'center', fontFamily: 'Georgia' }}>Search by School: </label>
          //           <div className="schoolSearch">
          //                <input type="text" placeholder="Search School" style={{ width: "300px", height: "40px" }} />
          //           </div>
          //           {/* Second search bar */}
          //           <label className="label" id="field" style={{ fontSize: "24px", textAlign: 'center', fontFamily: 'Georgia' }}>Search by Field of Study: </label>
          //           <div className="fieldSearch">
          //                <input type="text" placeholder="Search Field" style={{ width: "300px", height: "40px" }} />
          //           </div>
          //      </div>
          //      <div className="right">
          //           {/* Third search bar */}
          //           <label className="label" id="skills" style={{ fontSize: "24px", textAlign: 'center', fontFamily: 'Georgia' }}>Search by Skills: </label>
          //           <div className="skillSearch">
          //                <input type="text" placeholder="Search Skills" style={{ width: "300px", height: "40px" }} />
          //           </div>
          //           {/* Fourth search bar */}
          //           <label className="label" id="date" style={{ fontSize: "24px", textAlign: 'center', fontFamily: 'Georgia' }}>Search by Graduation Dates: </label>
          //           <div className="dateSearch">
          //                <input type="text" placeholder="Search Dates" style={{ width: "300px", height: "40px" }} />
          //           </div>
          //      </div>
          // </div>
     );
}

export default CandidateSearch;
