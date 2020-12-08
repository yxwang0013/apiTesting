import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import bodyParser from 'body-parser';
import loglevel from 'loglevel';

if (process.env.NODE_ENV === 'test') {
  loglevel.setLevel('warn')
 } else {
  loglevel.setLevel('info')
 }

dotenv.config();
 
const app = express();

const port = process.env.PORT;

//configure body-parser
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/api/movies', moviesRouter);

app.listen(port, () => {
  loglevel.info(`Server running at ${port}`);
});
module.exports = app