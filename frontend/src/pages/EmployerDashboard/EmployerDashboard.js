import "./employerdashboard.css"
import { useEffect, useState } from "react"
import CandidateCard from "../../components/CandidateCard/CandidateCard.js";
import "./employerdashboard.css"

const EmployerDashboard = () => {
     const data = [
          {
               first_name: "John",
               last_name: "Doe",
               field_of_study: "Computer Science",
               school_name: "Example University",
               graduation_date: "2023",
          },
          {
               first_name: "Jane",
               last_name: "Smith",
               field_of_study: "Electrical Engineering",
               school_name: "Another University",
               graduation_date: "2022",
          },
          {
               first_name: "Alice",
               last_name: "Johnson",
               field_of_study: "Mechanical Engineering",
               school_name: "ABC College",
               graduation_date: "2024",
          },
          {
               first_name: "Bob",
               last_name: "Williams",
               field_of_study: "Physics",
               school_name: "XYZ Institute",
               graduation_date: "2025",
          },
          {
               first_name: "Emily",
               last_name: "Brown",
               field_of_study: "Biology",
               school_name: "University of Science",
               graduation_date: "2023",
          },
          {
               first_name: "David",
               last_name: "Martinez",
               field_of_study: "Chemistry",
               school_name: "Science Academy",
               graduation_date: "2024",
          },
          {
               first_name: "Olivia",
               last_name: "Garcia",
               field_of_study: "Mathematics",
               school_name: "Math College",
               graduation_date: "2022",
          },
          {
               first_name: "Michael",
               last_name: "Lee",
               field_of_study: "Economics",
               school_name: "Econ University",
               graduation_date: "2025",
          },
          {
               first_name: "Sophia",
               last_name: "Lopez",
               field_of_study: "History",
               school_name: "History Institute",
               graduation_date: "2023",
          },
          {
               first_name: "William",
               last_name: "Taylor",
               field_of_study: "Political Science",
               school_name: "Politics College",
               graduation_date: "2024",
          },
     ];
     const [candidates, setCandidates] = useState(data)

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
          <div className="container">
               {
                    candidates.map(candidate => (
                         <div className="grid-item">
                         <CandidateCard first_name={candidate.first_name} field_of_study={candidate.field_of_study} school_name={candidate.school_name} graduation_date={candidate.graduation_date} />
                         </div>
                    ))
               }
          </div>
     );
}

export default EmployerDashboard;