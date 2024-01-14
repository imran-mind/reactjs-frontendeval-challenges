import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [principale, setPrincipale] = useState(0);
  const [interest, setInterest] = useState(0);
  const [years, setYears] = useState(0);
  const [emi, setEMI] = useState(0);

  const handleChange = (e) => {
    console.log(e.target.id, e.target.value);
    const id = e.target.id;
    const value = parseInt(e.target.value);
    if (id === 'principale') {
      setPrincipale(value);
    } else if (id === 'interest') {
      setInterest(value);
    } else {
      setYears(value);
    }
  }

  // P(r(1+r)^n/((1+r)^n)-1))
  const calculateEMI = () => {
    let r = interest;
    if (principale && r && years) {
      r = r / 12 / 100; // per month
      const calcPow = Math.pow(1 + r, years * 12);
      const amount = principale * ((r * calcPow) / (calcPow - 1));
      setEMI(Math.round(amount));
    }
  }

  useEffect(() => {
    calculateEMI();
  }, [principale, interest, years])

  return (
    <div className='loan-calc'>
      <h1>Mortgage Caclulator</h1>

      <div className='inputes'>
        <p>Principale:</p>
        <input
          onChange={handleChange}
          type='number' id='principale' />

        <p>Interest:</p>
        <input
          onChange={handleChange}
          type='number' id='interest' />

        <p>Years:</p>
        <input
          onChange={handleChange}
          type='number' id='year' />
      </div>

      <div className='output'>
        Your EMI is {emi}
      </div>
    </div>
  )
}

export default App;
