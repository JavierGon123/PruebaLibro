const express = require('express');
const booksRoutes = require('./routes/booksRoutes.js');

const app = express();
const port = 3000;

// Enable form reading
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'pug');

// Set application views
app.set('views', './views');

app.use('/books', booksRoutes);

app.listen(port, () => {
    console.log(`Listening port ${port}`);
});