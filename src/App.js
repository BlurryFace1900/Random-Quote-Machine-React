import "./styles.scss";
import ReactFCCtest from "react-fcctest";
import React, { useState, useEffect } from "react";
import COLOR from "./colors.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTumblr } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

const twittericon = <FontAwesomeIcon icon={faTwitter} />;
const tumblricon = <FontAwesomeIcon icon={faTumblr} />;
const quoteicon = <FontAwesomeIcon icon={faQuoteLeft} />;
let QuotesURL =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

export default function App() {
  const [quote, setQuote] = useState(
    " When I was 5 years old, my mother always told me that happiness was the key to life. When I went to school, they asked me what I wanted to be when I grew up. I wrote down ‘happy’. They told me I didn’t understand the assignment, and I told them they didn’t understand life."
  );
  const [author, setAuthor] = useState("John Lennon");
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
    <>
      <ReactFCCtest />
      <div className="App" style={{ backgroundColor: color }}>
        <div id="quote-box" style={{ color: color }}>
          <h3 id="text">
            <span>{quoteicon} </span>
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
            {twittericon}
          </a>
          <a
            style={{ backgroundColor: color }}
            id="tumblr-quote"
            target="_blank"
            href={encodeURI(`http://www.tumblr.com/`)}
          >
            {tumblricon}
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
    </>
  );
}
