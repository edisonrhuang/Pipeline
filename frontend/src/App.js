import './App.css';
import CreateCandidate from './pages/Forms/CreateCandidate';
import UpdateCandidate from './pages/Forms/UpdateCandidate';
import DeleteCandidate from './pages/Forms/DeleteCandidate';
import SelectCandidates from './pages/Queries/SelectCandidates';

function App() {
  return (
    <div>
      <h1>Candidates List</h1>
      <SelectCandidates/>
      <h1>Create Candidate</h1>
      <CreateCandidate/>
      <h1>Update Candidate</h1>
      <UpdateCandidate/>
      <h1>Delete Candidate</h1>
      <DeleteCandidate/>
    </div>
  );
}

export default App;
