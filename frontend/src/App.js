import './App.css';
import EmployerOrStudent from './pages/EmployerOrCandidate';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>

      <BrowserRouter basename="/app">
        <Routes>
          <Route path="/" /> {}
          <Route path="/employerorstudent" element={<EmployerOrStudent/>} /> {}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
