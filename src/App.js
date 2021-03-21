
import './App.scss';
import React, {useState,useEffect} from 'react';
import colorArray from './color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft} from '@fortawesome/free-solid-svg-icons';


let quoteURL="https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";


function App() {
  const [quote,setQuote]=useState("I’ve missed more than 9000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life. And that is why I succeed.");
  const [author,setAuthor]=useState("Michael Jordan");
  const [randomNumber,setRandomNumber]=useState(0)
  const [quotesArray,setQuotesArray]=useState(null)
  const [newColor,setNewColor]=useState('#282c34')

//Fetching quote from the data base asynchronously
  const fetchQuotes= async(url)=>{
    const response = await fetch(url)
    const parseJSON = await response.json()
    setQuotesArray(parseJSON.quotes)
    

  }

useEffect(()=>{
  fetchQuotes(quoteURL)
},[quoteURL])

//generating random quote
const getRandomQuote=()=>{
  let randomInt=Math.floor(quotesArray.length*Math.random())
  setQuote(quotesArray[randomInt].quote)
  setAuthor(quotesArray[randomInt].author)
  setNewColor(colorArray[randomInt])
}

return(
  <div className="App" >
    <header className="App-header" style={{
      backgroundColor:newColor,color:newColor}}>
    <div id="quote-box">
       <p id="text">
       <FontAwesomeIcon icon={faQuoteLeft}/>    {quote}</p>
       <p id="author">- {author}</p>
       <div className="button">
           <a id="tweet-quote" style={{
             backgroundColor:newColor }} href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}>
             <FontAwesomeIcon icon={faTwitter}/>
           </a>
           <button id="new-quote" onClick={()=>getRandomQuote()}
             style={{
          backgroundColor:newColor }}>New Quote</button>
      </div>

    </div>
    </header>
  </div>

  );
}

export default App;
