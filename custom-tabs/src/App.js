import './App.css';
import Tabs from './Tabs';

function App() {
  return (
    <div className="App">
      <h1>Custom Tabs</h1>
      {/* classname, disable  */}
      <Tabs>
        <div title='Home'>
          <h1>
            Tab content for Home
          </h1>
        </div>
        <div title='About'>
          Tab content for About
        </div>
        <div title='Contact'>
          Tab content for Contact
        </div>
      </Tabs>
    </div>
  );
}


export default App;
