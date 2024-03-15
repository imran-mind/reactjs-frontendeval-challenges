import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import debouceQuery from './utils';

function App() {

  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const handleInputChange = (e) => {
    setInput(e.target.value);
  }
  console.log(input);

  const initAPICall = async () => {
    const url =
      `https://api.frontendeval.com/fake/food/${input}`;
    const data = await debouceQuery(url);
    setList(data);
  }
  useEffect(() => {
    if (input) {
      initAPICall();
    }
  }, [input]);

  // [0, 100, 200, 300, 50, 1000]
  return (
    <div className="App">
      <h1>Debounce API call</h1>
      <input
        value={input}
        type='text'
        onChange={handleInputChange}
      />

      {list && list.length > 0 && <div className='list'>
        {
          list && list.map((item, index) => (
            <div key={index}>{item}</div>
          ))
        }
      </div>}
    </div>
  );
}

export default App;
