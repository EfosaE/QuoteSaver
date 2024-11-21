import { useEffect, useState } from 'react';

let baseURL: string = import.meta.env.VITE_PROD_API_URL;

if (import.meta.env.VITE_ENVIRONMENT === 'development') {
  baseURL = import.meta.env.VITE_DEV_API_URL;
}

interface Quote {
  _id: string; // Unique identifier for the quote
  content: string; // The content of the quote
  author: string; // The author of the quote
  tags: string[]; // List of tags associated with the quote
  authorSlug: string; // A slug version of the author's name
  length: number; // Length of the quote's content
  dateAdded: string; // Date when the quote was added
  dateModified: string; // Date when the quote was last modified
}

function App() {
  const [quote, setQuote] = useState<string | Quote>(
    "Click 'New Quote' to fetch a quote."
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [favorites, setFavorites] = useState<Quote[]>([]);

  // Fetch quote from URL
  const fetchQuote = async () => {
    console.log(baseURL);
    setQuote('Getting Quote...');
    try {
      const response = await fetch(`${baseURL}/quote`); // Example API
      const data = await response.json();
      const quote = data.quote;
      console.log(quote);
      setQuote(quote); // Assuming the quote is under the `content` key
    } catch (error) {
      console.log(error);
      setQuote('Failed to load quote. Try again!');
    }
  };

  // Fetch a quote on page load
  useEffect(() => {
    fetchQuote();
  }, []);

  const saveFavorite = (quote: Quote) => {
    if (!favorites.some((fav) => fav._id === quote._id)) {
      setFavorites([...favorites, quote]);
    }
  };

  return (
    <div className='App'>
      <h1
        style={{
          color: 'blue',
        }}>
        Quote Saver
        <span
          style={{
            fontSize: '14px',
            color: 'blueviolet',
          }}>
          By Efosa
        </span>
      </h1>
      <div className='quote-box'>
        <p
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'blue',
          }}>
          {typeof quote !== 'string' && quote.author}
        </p>
        <p
          style={{
            fontSize: '16px',
            color: 'blueviolet',
          }}>
          {typeof quote === 'string' ? quote : quote.content}
        </p>

        <div className='buttons'>
          <button onClick={fetchQuote}>New Quote</button>
          <button
            onClick={() => {
              if (typeof quote !== 'string') saveFavorite(quote);
            }}
            disabled={typeof quote === 'string'}>
            Save
          </button>
        </div>
      </div>
      <div className='favorites'>
        <h2>Favorites</h2>
        {favorites.length > 0 ? (
          <ul>
            {favorites.map((fav, index) => (
              <p key={index}>
                {fav.content}{' '}
                <span
                  style={{
                    fontSize: '14px',
                    color: 'burlywood',
                  }}>
                  by {fav.author}
                </span>
              </p>
            ))}
          </ul>
        ) : (
          <p>No favorites yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
