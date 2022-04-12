import React, {useState, useEffect} from 'react';
import './App.scss';
import colorArray from "./colorArray";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
    const [quote, setQuote] = useState("Everything has beauty, but not everyone can see.")
    const [author, setAuthor] = useState("Confucius")
    const [randomNumber, setRandomNumber] = useState(0)
    const [quotesArray, setQuotesArray] = useState(null)
    const [accentColor, setAccentColor] = useState('#6666FF')
    const fetchQuotes = async (url) => {
        const response = await fetch(url)
        const parsedJSON = await response.json()
        setQuotesArray(parsedJSON.quotes)
    }

    useEffect(() => {
        fetchQuotes(quoteDBUrl)
    }, [quoteDBUrl])
    const generateRandomNumber = () => {
        let randomInteger = Math.floor(quotesArray.length * Math.random())
        setRandomNumber(randomInteger)
        setAccentColor(colorArray[randomInteger])
        setQuote(quotesArray[randomInteger].quote)
        setAuthor(quotesArray[randomInteger].author)
    }

  return (
    <div className="App">
        <header className="App-header" style={
            {backgroundColor: accentColor}}>
            <div id="quote-box" style={
            {color: accentColor}}>
            <h1>Quote Number: {randomNumber}</h1>
            <p id="text">
                "{quote}"
            </p>
            <p id="author">-  {author}</p>
                <div className="button">
                <a id="tweet-quote" style={
            {backgroundColor: accentColor}} href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}><FontAwesomeIcon icon={faTwitter} /></a>
                <button onClick={ () => generateRandomNumber()} id="new-quote" style={
            {backgroundColor: accentColor}}>Generate a new quote</button>
                </div>
            </div>
        </header>

    </div>
  );
}

export default App;
