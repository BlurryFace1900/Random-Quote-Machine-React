import "./styles.scss";
import React, { useState, useEffect } from "react";

let QuotesURL =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

export default function App() {
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();
  const [quotesArray, setQuotesArray] = useState(null);

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
    console.log(parsedJSON.quotes);
  };

  useEffect(() => {
    fetchQuotes(QuotesURL);
  }, [QuotesURL]);

  const getRandomQuotes = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random());
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
  };

  return (
    <div id="quote-box" className="App">
      <div className="App-Header">
        <p id="text">{quote}</p>
        <p id="author">- {author}</p>
        <a id="tweet-quote" href="">
          tweet
        </a>
        <button id="new-quote" onClick={() => getRandomQuotes()}>
          Change Quote
        </button>
      </div>
    </div>
  );
}
