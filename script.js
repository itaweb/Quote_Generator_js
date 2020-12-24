const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// Get Quote From API
async function getQuote() {
  const proxyUrl = "https://still-springs-09114.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // If Author is blank, add 'Неизвестный автор'
    if(data.quoteAuthor === ''){
      authorText.innerText = 'Неизвестный автор';
    }else{
      authorText.innerText = data.quoteAuthor;
    }
    // Reduce font size for long quote
    if(data.quoteText.length > 120){
      quoteText.classList.add('long-quote');
    }else{
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
  } catch (error) {
    getQuote();
  }
}

// Tweet Quote
function tweetQuote(){
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;
  const tweeterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(tweeterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
