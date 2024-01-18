import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [food, setFood] = useState('');
  const [shoppingList, setShoppingList] = useState([]);
  const [bucketList, setBucketList] = useState([]);

  const handleInput = (e) => {
    setFood(e.target.value);
    console.log(food);
  }

  const fetchItems = async (food) => {
    const url =
      `https://api.frontendeval.com/fake/food/${food}`;
    console.log(url);
    try {
      const result = await fetch(url);
      console.log(result);
      if (result.status === 200) {
        const data = await result?.json();
        setShoppingList(data);
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  // console.log(shoppingList);

  useEffect(() => {
    if (food.length >= 2) {
      //make an api call
      fetchItems(food);
    }
  }, [food])

  const handleShoppingList = (e) => {
    const idx = e.target.getAttribute('data-id');
    if (idx) {
      const obj = {
        id: Date.now(),
        data: shoppingList[idx],
        isDone: false
      }
      const copyBucketList = [...bucketList];
      copyBucketList.push(obj);
      setBucketList(copyBucketList);
    }
    setFood('')
  }
  console.log(bucketList);

  const handleRightClick = (id) => {
    const copyBucketList = [...bucketList];
    const newBucketList = copyBucketList.map((item) => {
      if (item.id == id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    setBucketList(newBucketList);
  }

  const handleDelete = (id) => {
    const copyBucketList = [...bucketList];
    const newList =
      copyBucketList.filter((item) => item.id != id);
    setBucketList(newList);
  }

  const handleActions = (e) => {
    const action = e.target.getAttribute('data-id');
    const [type, id] = action.split(':');
    console.log(type, id);
    if (type === 'update') {
      handleRightClick(id);
    } else if (type === 'delete') {
      handleDelete(id);
    }
  }
  return (
    <div className="App">
      <h1>My Shopping List</h1>
      {/* input button */}
      <div>
        <input
          value={food}
          onChange={handleInput}
        />
      </div>

      {/* auto suggestion */}
      {
        food.length >= 2 ? <div className='shopping-list'
          onClick={handleShoppingList}
        >
          {
            shoppingList.map((item, index) => {
              return <div
                data-id={index}
                className='product'>
                {item}
              </div>
            })
          }
        </div> : null
      }

      {/* bucket list */}
      <div className='bucket'
        onClick={handleActions}
      >
        {
          bucketList.map((item) => {
            return <div className='shopping-item'>
              <button
                data-id={`update:${item.id}`}
              // onClick={() => handleRightClick(item.id)}
              >✓</button>
              <div
                className={item.isDone ? 'strik' : ''}
              >{item.data}</div>
              <button
                data-id={`delete:${item.id}`}
              // onClick={() => handleDelete(item.id)}
              >X</button>
            </div>
          })
        }
      </div>

    </div>
  );
}

export default App;
