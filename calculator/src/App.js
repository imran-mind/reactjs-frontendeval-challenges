import { useState } from 'react';
import './App.css';
function App() {

  const arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    '+', '-', '/', '*', '=', 'C', '.'
  ]
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  }
  const handleClick = (e) => {
    const id = e.target.id;
    if (id === 'C') {
      setValue('');
    } else if (id === '=') {
      //produce a result
      handleSubmit();
    } else {
      setValue((val) => val + id);
    }
    console.log();
  }

  const handleSubmit = (e) => {
    e?.preventDefault();
    try {
      const ans = eval(value);
      setValue(ans);
    } catch (err) {
      alert("Invalid Inputs")
    }
  }
  console.log(value);
  return (
    <div className="App">
      <h1>Calculator</h1>
      <form
        onSubmit={handleSubmit}
      >
        <input
          value={value}
          onChange={handleChange}
          type='text'
        />
      </form>
      <div className='container'
        onClick={handleClick}
      >
        {
          arr.map((item, idx) => (
            <button
              id={item}
              key={idx}
              className='cell'
            >{item}</button>
          ))
        }
      </div>
    </div>
  );
}

export default App;
