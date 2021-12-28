import "./styles.scss";
import React, { useState, useEffect } from "react";
import COLOR from "./colors.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTumblr } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

const element1 = <FontAwesomeIcon icon={faTwitter} />;
const element2 = <FontAwesomeIcon icon={faTumblr} />;
const element3 = <FontAwesomeIcon icon={faQuoteLeft} />;
let QuotesURL =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

export default function App() {
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();
  const [quotesArray, setQuotesArray] = useState(null);
  const [color, setColor] = useState("red");

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
    setColor(COLOR[Math.floor(COLOR.length * Math.random())]);
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
  };

  document.body.style.backgroundColor = color;

  return (
    <div className="App" style={{ backgroundColor: color }}>
      <div id="quote-box" style={{ color: color }}>
        <h3 id="text">
          <span>{element3} </span>
          {quote}
        </h3>
        <h4 id="author">- {author}</h4>
        <a
          style={{ backgroundColor: color }}
          id="tweet-quote"
          target="_blank"
          href={encodeURI(
            `http://www.twitter.com/intent/tweet?text=${quote} -${author}`
          )}
        >
          {element1}
        </a>
        <a
          style={{ backgroundColor: color }}
          id="tumblr-quote"
          target="_blank"
          href={encodeURI(`http://www.tumblr.com/`)}
        >
          {element2}
        </a>
        <button
          style={{ backgroundColor: color }}
          id="new-quote"
          onClick={() => getRandomQuotes()}
        >
          New Quote
        </button>
      </div>
    </div>
  );
}
