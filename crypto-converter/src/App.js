import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
// '↑' : '↓'

function App() {
  const arr = ['usd', 'eur', 'gbp', 'cny', 'jpy'];
  const [currency, setCurrency] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const [convertedCurr, setConvertedCurr] = useState(0);
  const [isUp, setIsUp] = useState(true);
  const [diff, setDiff] = useState(0);
  const handleInputChange = (e) => {
    const val = e.target.value;
    console.log(val);
    setCurrency(val);
  }

  const handleCurrencyType = (e) => {
    const type = e.target.value;
    console.log(type)
    setSelectedCurrency(type)
  }

  const fetchCurrencyInfo = async () => {
    try {
      const url =
        `https://api.frontendeval.com/fake/crypto/${selectedCurrency}`
      const result = await fetch(url);
      const data = await result.json();
      const val = data.value;
      const showCurr = currency * val;
      setConvertedCurr(showCurr.toFixed(2));

      const prevVal = window.sessionStorage.getItem('prevVal');
      console.log('prevVal : ', prevVal);
      console.log('currVal: ', showCurr.toFixed(2))
      const diff = showCurr.toFixed(2) - prevVal;
      diff < 0 ? setIsUp(false) : setIsUp(true);
      setDiff(diff.toFixed(2));

      window.sessionStorage.setItem('prevVal', showCurr.toFixed(2));
    } catch (err) {
      console.error('Error : ', err);
    }
  }

  useEffect(() => {
    let time;
    time = setInterval(() => {
      fetchCurrencyInfo();
    }, 10000);
    return () => {
      clearInterval(time);
    }
  }, [currency, selectedCurrency])

  return (
    <div className="App">
      <h1>Crypto Convert App</h1>
      <div className='wrapper'>
        <input
          type='number'
          value={currency}
          onChange={handleInputChange}
        />

        <select
          onChange={handleCurrencyType}
          name="currency"
          value={selectedCurrency}
        >
          {
            arr.map((curr) => (
              <option
                key={curr}
                value={curr}>
                {curr.toUpperCase()}
              </option>
            ))
          }
        </select>
      </div>

      <div className='curr-info'>
        <div>{convertedCurr}</div>
        <div>WUC</div>
        <div className={
          isUp ? 'green' : 'red'
        }>
          <span>{isUp ? '↑' : '↓'}</span>
          <span>{diff}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
