import express from 'express';
import quoteRouter from './routes/quoteRoute';
import cors from 'cors';

const app = express();
// allows all origins for the purpose of this task
app.use(
  cors()
);
// enables the app to read request body
app.use(express.json());


// Define a route for the root path ('/')
app.get('/', (req, res) => {
  res.send('Hello from Quote Saver');
});


// define my routes here...
app.use('/api/v1/quote', quoteRouter);



// handle undefined routes
app.all('*', (req, res) => {
  return res.status(404).json({
    status: 'Not Found',
    message: `cant find api path ${req.originalUrl}`,
  });
});


// I export my app module because if you are working with a large app, DB config and app config in the same file can get bulky
export default app;
