import './App.css';
import CreateCandidate from './pages/Forms/CreateCandidate';
import UpdateCandidate from './pages/Forms/UpdateCandidate';
import DeleteCandidate from './pages/Forms/DeleteCandidate';
import SelectCandidates from './pages/Queries/SelectCandidates';


import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
         
            <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>

    
    </div>
  );
}

export default App;
