import axios from 'axios';
import https from 'https';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export interface Quote {
  content: string;
  author: string;
  tags: string[];
}

export interface ExtendedQuote extends Quote {
  _id: string;
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

// I created an Axios base instance with custom configuration because the ssl cert of the api given is expired.
export const axiosInstance = axios.create({
  baseURL: 'https://api.quotable.io',
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Disable SSL certificate validation
  }),
  timeout: 5000,
});

// usually this will be placed in a middleware but to avoid too many abstractions on a small task we have it here...
export const validateQuote = (req: Request, res: Response, next: NextFunction) => {
  const { content, author, tags } = req.body;

  if (!content || content.trim() === '') {
    return res
      .status(400)
      .json({ error: 'Content is required and cannot be empty' });
  }

  if (!author || author.trim() === '') {
    return res
      .status(400)
      .json({ error: 'Author is required and cannot be empty' });
  }

  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    return res
      .status(400)
      .json({ error: 'Tags must be an array with at least one tag' });
  }

  next(); // If the validation passes, continue to the controller
};

export const transformQuote = (quote: Quote): ExtendedQuote => {
  const { content, author, tags} = quote;

  // Add fields dynamically
  return {
    _id: uuidv4(), // Generate a unique ID
    content,
    author,
    tags,
    // converts "John Doe" to "john-doe"
    authorSlug: author.toLowerCase().replace(/ /g, '-'),
    length: content.length, // Calculate the length of the quote
    dateAdded: new Date().toISOString(), // Current timestamp
    dateModified: new Date().toISOString(), // Set as same as dateAdded for new quotes
  };
};


