import fs from 'fs';
import path from 'path';
import { ExtendedQuote } from './helpers';
import { error } from 'console';

export const saveQuoteToFile = (quote: ExtendedQuote) => {
  console.log(__dirname);

  const filePath = path.join(__dirname, 'quotes.json');

  // Check if the file exists
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err && err.code === 'ENOENT') {
      // File doesn't exist, so create a new one
      fs.writeFile(filePath, JSON.stringify([quote], null, 2), (err) => {
        if (err) {
          throw error('Error saving quote:', err);
        } else {
          // saves to my dist folder because it is a compiled js commabd
          console.log('quote saved to new file');
        }
      });
    } else if (err) {
      // this will be caught by the catch block in our post controller
      throw error('Error reading file:', err);
    } else {
      // File exists, append the new quote
      const quotes = JSON.parse(data);
      quotes.push(quote);

      // Write updated quotes back to the file
      fs.writeFile(filePath, JSON.stringify(quotes, null, 2), (err) => {
        if (err) {
          // this will be caught by the catch block in our post controller
          throw error('Error saving quote:', err);
        } else {
          console.log('quote saved');
        }
      });
    }
  });
};
