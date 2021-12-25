// global variables

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const quoteTwitter = document.getElementById('twitter');
const quoteNew = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// showing the loading function

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete(){
    quoteContainer.hidden  = false;
    loader.hidden = true;
}

// Show New Quotes
function newQuote(){
    loading();
    // pick the random quotes from the api quotes
    const quote = apiQuotes[Math.floor(Math.random() *  apiQuotes.length)];
    // if there is no author-----
    (!quote.author) ? quoteAuthor.textContent =  " Unkown Author" : quoteAuthor.textContent = quote.author;

   
    // checking the long text to determine styling ---------
    (quote.text.length > 120) ?  quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');

    // set the quote to hide the loader

   
    quoteText.textContent = quote.text;
   
    complete();

}
// functionality of API Quotes
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';

    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    }
    catch(error){
        // catching error
        alert(error)
    }

}

// tweet
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank')
} 

// evenlisenering
quoteNew.addEventListener('click', newQuote);
quoteTwitter.addEventListener('click', tweetQuote);

// on load
getQuotes();


