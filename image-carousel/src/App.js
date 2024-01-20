import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {

  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    const url = 'https://www.reddit.com/r/aww/top/.json?t=all';
    const res = await fetch(url);
    const result = await res.json();
    const data = result.data.children;
    // console.log(data);
    const list = data.filter(
      (item) =>
        item.data.url_overridden_by_dest.includes('.jpg'))
      .map((item) => item.data.url_overridden_by_dest);
    setImages(list);
    setLoading(false);
  }

  useEffect(() => {
    fetchImages();
  }, []);


  const handleClick = (dir) => {
    console.log('curr index', index);
    //0
    const lastIdx = images.length - 1;
    if (dir === 'left') {
      if (index === 0) {
        console.log('last idx ', lastIdx);
        setIndex(lastIdx);
      } else {
        setIndex((idx) => idx - 1)
      }
    } else if (dir === 'right') {
      if (lastIdx === index) {
        //8 === 8 -> index-> 0
        setIndex(0);
      } else {
        setIndex((idx) => idx + 1);
      }
    }
  }

  useEffect(() => {
    const tid = setInterval(() => {
      handleClick('right');
    }, 1000);

    return () => {
      clearInterval(tid);
    }
  }, [index])
  return (
    <div className="App">
      {loading ?
        <div>Loading ....</div> :
        <>
          <button
            onClick={() => handleClick('left')}
          >
            {"<"}
          </button>
          <img src={images[index]} alt='not-found' />
          <button
            onClick={() => handleClick('right')}
            className='right'>
            {">"}
          </button>
        </>
      }
    </div>
  );
}

export default App;
