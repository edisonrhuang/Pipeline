import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.js'
import './statistics.css'

const stats = {
     totalUsers: 70,
     malePercent: 50,
     femalePercent: 50,
     AI_AN_per: 10,
     asianPI_per: 20,
     black_per: 15,
     hispanic_per: 15,
     white_per: 20,
     biracial_per: 10,
     other_per: 10
};

const Statistics = () => {
     const { totalUsers, malePercent, femalePercent,
          AI_AN_per, asianPI_per, black_per, hispanic_per, white_per,
          biracial_per, other_per } = stats
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
                    <h1>User Statistics</h1>
                    Total Users: {totalUsers}
                    <br />
                    <br />
                    Percentage of Male Users: {malePercent}%
                    <br />
                    <br />
                    Percentage of Female Users: {femalePercent}%
                    <br />
                    <br />
                    Number of Native American Users: {AI_AN_per}%
                    <br />
                    <br />
                    Number of Asian Users: {asianPI_per}%
                    <br />
                    <br />
                    Number of Black Users: {black_per}%
                    <br />
                    <br />
                    Number of Hispanic Users: {hispanic_per}%
                    <br />
                    <br />
                    Number of White Users: {white_per}%
                    <br />
                    <br />
                    Number of Two or More Races Users: {biracial_per}%
                    <br />
                    <br />
                    Number of Other Users: {other_per}%
                    <br />
                    <br />
               </div> */}
          </div>
     );
}

export default Statistics;