import { useState, useEffect } from 'react'
import './App.css'
import Card from './Card';

function App() {
  const [playerScore, setPlayerScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gifArray, setGifArray] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);

  const apiKey = "SPxNs4uCnvOCWCRWBXC9GWJt7nkuVAwX";
  const searchTerm = "epl team badge";
  const limit = 10;

  //get gifs with useEffect
  async function fetchGifs() {
      try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=${limit}`);
        const data = await response.json();

        setGifArray(data.data);
      }
      catch(error) {
        console.error("Error fetching GIFs:", error);
      }
  }

  useEffect(
    () => {
        fetchGifs()

        return () => {
          setGifArray([]);
        }
    }, []
  )

  function randomizeArray(array) {
    const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
    return shuffledArray;
  }

  function handleRandomize() {
    setGifArray(randomizeArray(gifArray));
  }

  function handleClick(id) {
    handleRandomize();

    //check if card has been clicked
    if(!(clickedIds.includes(id))) {
      setPlayerScore(playerScore + 1);

      let newIds = [...clickedIds];
      newIds.push(id);
      setClickedIds(newIds);
    }

    else {
      resetScores(playerScore);
    }

  }

  function resetScores(highScore) {
    highScore > bestScore ? setBestScore(highScore) : null;
    setClickedIds([]);
    setPlayerScore(0);
  }

  return (
    <div className='main'>
      <div className='heading'>
        <div className='header-text'>
          <header>EPL Teams Memory Game</header>
          <span>Get points by clicking on an image but don&#39;t click on any more than once!</span>
        </div>
        <div className='header-scores'>
          <span>{"Your score:  " + playerScore}</span>
          <span>{"Best Score:  " + bestScore}</span>
        </div>
      </div>
      <div className='card-container'>
          {
            gifArray.map((item) => {
              return <Card 
              key={item.id}
              gifObj={item}
              handleClick={handleClick}/>
            })
          }
      </div>
    </div>
  )
}

export default App
