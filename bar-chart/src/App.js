import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  const [freq, setFreq] = useState(undefined);
  const [yAxis, setYAxis] = useState([]);
  const fetchNumbers = async () => {
    const url = 'https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new'
    const res = await fetch(url);
    let data = await res.text();
    data = data.split('\n').filter(Boolean);
    const map = {};
    data?.forEach(item => {
      if (map[item]) {
        map[item] = map[item] + 1;
      } else {
        map[item] = 1
      }
    });
    setFreq(map);
  }

  console.log(freq);

  //preparing y-axis data
  // [30,20,10,0]
  useEffect(() => {
    if (freq) {
      const max = Math.max(...Object.values(freq));
      const maxVal = Math.ceil(max / 10) * 10;
      let arr = [];
      for (let i = (maxVal / 10); i >= 0; i--) {
        //3,2,1,0
        arr.push(i * 10);//30,20,10,0
      }
      setYAxis(arr);
    }
  }, [freq])
  console.log('yAxis ', yAxis);
  useEffect(() => {
    fetchNumbers();
  }, [])
  return (
    <div className="App">
      <div className='container'>
        <div className='box'>
          <div
            className='box-y-axis'
            style={{
              height: `${yAxis && yAxis[0]}%`
            }}
          >
            {
              yAxis?.map((val, idx) => (
                <div key={idx}>
                  <span>{val}</span>
                </div>
              ))
            }
          </div>

          {
            freq &&
            Object.entries(freq)
              ?.map(([key, val]) => (
                <div className='box-x-axis'>
                  <div
                    style={{
                      height: `${val}%`
                    }}
                    className='graph'>
                  </div>
                  <div className='index'>
                    {key}
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
