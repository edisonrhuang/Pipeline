import CandidateCard from "./CandidateCard";

import { useEffect, useState } from "react";



const TestCandidateCard = () => {
     const [candidates, setCandidates] = useState([])

     const JWT = sessionStorage.getItem("JWT")

     useEffect(() => {
          fetch('http://127.0.0.1:5002/candidates', {
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
               {
                    candidates.map(candidate => (
                         <CandidateCard first_name={candidate.first_name} field_of_study={candidate.field_of_study} school_name={candidate.school_name} graduation_date={candidate.graduation_date} />
                    ))
               }
          </div>
     );
}

export default TestCandidateCard;