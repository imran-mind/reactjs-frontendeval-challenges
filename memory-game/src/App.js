import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

//[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
const getNums = () => {
  const list = [];
  for (let i = 1; i <= 8; i++) {
    list.push(i);
    list.push(i);
  }
  return list;
}
//6X6=> 36/2 -> 18
//4X4
function App() {
  const [nums, setNums] = useState(getNums());
  const [opened, setOpened] = useState([]);
  const [solvedList, setSolvedList] = useState([]);
  const [stage, setStage] = useState('init');

  console.log('solvedList ', solvedList);
  console.log('nums', nums);
  const randdomNums = () => {
    const copyNums = [...nums];
    return copyNums.sort(() => Math.random() - 0.5);
  }
  const handleStart = () => {
    setStage('start');
    setNums(randdomNums());
    setSolvedList([]);
  }
  const handleClick = (num, index) => {
    if (opened.length === 2)
      return
    setOpened((prev) => [...prev, index]);
  }
  console.log('opened ', opened);

  useEffect(() => {
    if (opened.length === 2) {
      //num qual
      //num not equal
      setTimeout(() => {
        const id1 = opened[0];
        const id2 = opened[1];
        if (nums[id1] === nums[id2]) {//if equal than remove the cards
          setSolvedList((prev) => [...prev, nums[id1]]);
        }
        setOpened([]);
      }, 1000)
    }
  }, [opened])

  useEffect(() => {
    if (solvedList.length === 8) {
      setStage('win');
    }
  }, [solvedList])
  // console.log('nums ', nums);
  const getClassName = (num, index) => {
    if (solvedList.includes(num)) {
      return 'remove';
    } else if (opened.includes(index)) {
      return 'show';
    } else {
      return 'hide';
    }
  }
  return (
    <div className="App">
      <h1>Memory Game</h1>
      {stage === 'init' &&
        <button
          onClick={handleStart}
        >Play Game</button>}

      {
        stage === 'start' &&
        <div className='game'>
          <div className='cards'>
            {
              nums.map((num, i) => (
                <div
                  key={i}
                  className={`card ${getClassName(num, i)}`}
                  onClick={() => handleClick(num, i)}
                >
                  {num}
                </div>
              ))
            }
          </div>
        </div>
      }
      {
        stage === 'win' &&
        <div>
          <h1>You won the Game!</h1>
          <button
            onClick={handleStart}
          >Play Again</button>
        </div>
      }
    </div>
  );
}

export default App;
