import './App.css';
import EmployerOrCandidate from './pages/EmployerOrCandidate';
import CandidateCreate from "./pages/CandidateCreate"
import CandidateSearch from "./pages/CandidateSearch"
import CandidateDashboard from "./pages/CandidateDashboard"
import CandidateProfile from "./pages/CandidateProfile"
import EmployerCreate from "./pages/EmployerCreate"
import EmployerProfile from "./pages/EmployerProfile"
import EmployerUpdate from "./pages/EmployerUpdate"
import CandidateUpdate from "./pages/CandidateUpdate"
import Login from './pages/Login';
import CandidateCard from './components/CandidateCard/CandidateCard';
import TestCandidateCard from './components/CandidateCard/Test';
// import EmployerProfile from "./pages/EmployerProfile"

import { Route, Routes } from "react-router-dom"
import EmployerDashboard from './pages/EmployerDashboard/EmployerDashboard';
import CreateCandidate from './pages/Forms/CreateCandidate';

function App() {
  return (
    <div>

      <Routes>
        <Route path="/employerorcandidate" element={<EmployerOrCandidate />} />
        <Route path="/candidatecreate" element={<CandidateCreate />} />
        <Route path="/candidateprofile" element={<CandidateProfile />} />
        <Route path="/employerorcandidate" element={<EmployerOrCandidate />} />
        <Route path="/candidatesearch" element={<CandidateSearch />} />
        <Route path="/candidatedashboard" element={<CandidateDashboard />} />
        <Route path="/candidateupdate" element={<CandidateUpdate />} />
        <Route path="/employerprofile" element={<EmployerProfile />} />
        <Route path="/employerupdate" element={<EmployerUpdate />} />
        <Route path="/employercreate" element={<EmployerCreate />} />
        <Route path="/employerdashboard" element={<EmployerDashboard />} />

        <Route path="/candidatecard" element={<CandidateCard  />} />
        <Route path="/login" element={<Login />} />
        <Route path="/x" element={<CreateCandidate/>}></Route>
        <Route path="/test" element={<TestCandidateCard/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
