import { Request, Response } from 'express';
import { axiosInstance, transformQuote } from '../utils/helpers';
import { saveQuoteToFile } from '../utils/file-util';

export const getQuotes = async (req: Request, res: Response) => {
  try {
    const response = await axiosInstance.get('/random');
    const quotes = response.data;
    console.log(response.data);
    return res.status(200).json({
      quotes,
    });
  } catch (error) {
    console.error('Error fetching the quote:', error);
    return res.status(500);
  }
};

export const postQuote = async (req: Request, res: Response) => {
  try {
    const quote = req.body;
    const transformedQuote = transformQuote(quote);

    console.log(transformedQuote);
    //   used a file based storage but is not persistent
    saveQuoteToFile(transformedQuote);
    return res.status(201).json({
      quote: transformedQuote,
    });
  } catch (error) {
    console.error('Error creating the quote:', error);
    return res.status(500);
  }
};
