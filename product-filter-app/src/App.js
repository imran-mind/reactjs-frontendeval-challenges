import { useEffect, useState } from 'react';
import './App.css';
import { items } from './items';
//  ['Bags', 'Watches', 'Sports', 'Sunglasses']
function App() {
  const filters = ['Bags', 'Watches', 'Sports', 'Sunglasses'];
  const [filteredData, setFilteredData] = useState(items)
  const [activeFilters, setActiveFilters] = useState([]);

  const handleFilterClick = (e) => {
    const category = e.target.id;
    console.log(category);
    if (activeFilters.includes(category)) {//toggle false
      const filters = activeFilters.filter((el) => el !== category);
      setActiveFilters(filters)
    } else {//
      setActiveFilters([...activeFilters, category]);//toggle true
    }
  }
  console.log('activeFilters ', activeFilters);

  const filterProducts = () => {
    if (activeFilters.length) {
      const tempItems =
        items.filter((item) => activeFilters.includes(item.category))
      setFilteredData(tempItems);
    } else {
      setFilteredData(items);
    }
  }
  useEffect(() => {
    filterProducts()
  }, [activeFilters])

  return (
    <div className="App">
      <div className='filters'
        onClick={handleFilterClick}
      >
        {
          filters.map((item, idx) => (
            <button
              className={activeFilters.includes(item) ? 'selected' : ''}
              key={idx}
              id={item}
            >{item}</button>
          ))
        }
      </div>

      <div className='product-list'>
        {
          filteredData.map((item, idx) => (
            <div className='item' key={idx}>
              <p>{item.name}</p>
              <p className='category'>{item.category}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
