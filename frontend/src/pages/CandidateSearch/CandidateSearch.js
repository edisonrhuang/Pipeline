import "./candidatesearch.css";
import Navbar from '../../components/Navbar/Navbar.js';

// import data from dataFile

function CandidateSearch() {
     return (
          <div className="CandidateSearch">
               <Navbar />
               <div className = "left">
                    {/* First search bar */}
                    <label className = "label" id = "school" style={{ fontSize: "24px", textAlign: 'center', fontFamily: 'Georgia' }}>Search by School: </label>
                    <div className="schoolSearch">
                         <input type="text" placeholder="Search School" style={{ width: "300px", height: "40px" }} />
                    </div>
                    {/* Second search bar */}
                    <label className = "label" id = "field" style={{ fontSize: "24px", textAlign: 'center', fontFamily: 'Georgia' }}>Search by Field of Study: </label>
                    <div className="fieldSearch">
                         <input type="text" placeholder="Search Field" style={{ width: "300px", height: "40px" }} />
                    </div>
               </div>
               <div className = "right">
                    {/* Third search bar */}
                    <label className = "label" id = "skills" style={{ fontSize: "24px", textAlign: 'center', fontFamily: 'Georgia' }}>Search by Skills: </label>
                    <div className="skillSearch">
                         <input type="text" placeholder="Search Skills" style={{ width: "300px", height: "40px" }} />
                    </div>
                    {/* Fourth search bar */}
                    <label className = "label" id = "date" style={{ fontSize: "24px", textAlign: 'center', fontFamily: 'Georgia' }}>Search by Graduation Dates: </label>
                    <div className="dateSearch">
                         <input type="text" placeholder="Search Dates" style={{ width: "300px", height: "40px" }} />
                    </div>
               </div>
          </div>
     );
}

export default CandidateSearch;