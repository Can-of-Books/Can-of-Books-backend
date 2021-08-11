require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

mongoose.connect(`${MONGO_DB_URL}/books`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

const verifyToken = require('./controllers/auth.controller'); 
const {
  getBooks,
  createBook,
  deleteBook
} = require('./controllers/book.controller');

const seedUserBooks = require('./models/book.model');
// seedUserBooks();

app.get('/', (req, res) => res.send("Hello From My Server"));

app.get('/test', verifyToken);

app.get('/books', getBooks);

app.post('/book', createBook);

app.delete('/book/:book_id', deleteBook);


app.listen(PORT, () => console.log(`listening on ${PORT}`));
