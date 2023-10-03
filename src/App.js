import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';

function App() {

  const [fruits, setFruits] = useState([]);
  const [fruitFilter, setFruitFilter] = useState("");

  const filterFruits = (fruit) => {
    setFruitFilter(fruit);
    let fruitsFiltered = fruits;
    fruitsFiltered = fruitsFiltered.filter((elem) => elem.name.includes(fruit));

    if(fruit !== "")
      setFruits(fruitsFiltered);
    else getFruits();
  }

  const getFruits = () => {
    axios.get('https://www.fruityvice.com/api/fruit/all')
    .then( res => {
      setFruits(res.data);
    })
  }

  useEffect(() => {
    getFruits();
  },[])


  return (
    <div className="App">
      <header className="App-header">
      <div className='fruit-filter'>
        <input type='text' placeholder='Fruit name...' value={fruitFilter} onChange={(e) => filterFruits(e.target.value)} />
      </div>
      <div className='fruits-list'>
        {fruits.length > 0 ?
          fruits.map((fruit, key) => (
            <div className='fruit' key={key}>
              <h3>{fruit.name}</h3>
              <h4>{fruit.family}</h4>
              <p>{fruit.nutritions.calories}</p>
            </div>
          ))
          :
          <>
          </>
        }
      </div>
      </header>
    </div>
  );
}

export default App;
