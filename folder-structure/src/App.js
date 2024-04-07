import './App.css';
import Folder from './Folder';
import { files } from './data';

function App() {

  return (
    <div className="App">
      <h1>VS Code Folder Structure</h1>
      <Folder files={files} />
    </div>
  );

}


export default App;
