import React from 'react';
import Navbar from '../../components/CandidateNavbar/CandidateNavbar.js'
import Notification from './notification.js'


const CandidateDashboard = () => {
        return (
          <div className="candidateDashboard">
               <Navbar/>
               <Notification/>
               <Notification/>
          </div>
        );
}
 
export default CandidateDashboard;