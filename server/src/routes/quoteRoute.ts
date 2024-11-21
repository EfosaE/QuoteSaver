import { Router } from 'express';
import { getQuotes, postQuote } from '../controllers/quoteController';
import { validateQuote } from '../utils/helpers';

// I use specific names to know which of the router I am working with, router as a var name is fine.
const quoteRouter = Router();

// call the controller here
quoteRouter.route('/').get(getQuotes).post(validateQuote, postQuote);
export default quoteRouter;
