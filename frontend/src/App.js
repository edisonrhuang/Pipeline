import './App.css';
import EmployerOrCandidate from './pages/EmployerOrCandidate';
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div>

        <Routes>
          <Route path="/" /> {}
          <Route path="/employerorcandidate" element={<EmployerOrCandidate/>} /> {}

        </Routes>
    </div>
  );
}

export default App;
