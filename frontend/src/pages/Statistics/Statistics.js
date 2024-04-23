import React, { useEffect, useState } from 'react';
// import Navbar from '../../components/Navbar/Navbar.js'
import './statistics.css'

const Statistics = () => {
     const JWT = sessionStorage.getItem("JWT")
     const [display, setDisplay] = useState([])
     useEffect(() =>      {
          fetch(`http://127.0.0.1:5002/`, {
               method: 'GET',
               headers: { 'Authorization': `${JWT}`, 'Content-Type': "application/json" }
          }).then((res) => res.json()).then((data) => {
               console.log(data)
               setDisplay(data)
          }).catch(error => console.log("log:" + error))
     }, [])
     return (
          <div>
               {
                    JSON.stringify(display)
               }
               {/* <Navbar />
               <div id="total">
                    
               </div> */}
          </div>
     );
}

export default Statistics;