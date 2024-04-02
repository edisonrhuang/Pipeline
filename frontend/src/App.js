import './App.css';
import CandidatesList from './components/queries/CandidatesList';
import CandidateInsert from './components/forms/CandidateInsert';
import CandidateUpdate from './components/forms/CandidateUpdate';
import CandidateDelete from './components/forms/CandidateDelete';

function App() {
  return (
    <div>
      <h1>Candidates List</h1>
      <CandidatesList/>
      <h1>Create Candidate</h1>
      <CandidateInsert/>
      <h1>Update Candidate</h1>
      <CandidateUpdate/>
      <h1>Delete Candidate</h1>
      <CandidateDelete/>
    </div>
  );
}

export default App;
