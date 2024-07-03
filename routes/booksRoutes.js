const express = require('express');
const router = express.Router();

const {
    bookForm,
    saveBooks,
    deleteButton,
    newBook,
    borrarHistoria
} = require("../controllers/booksController.js");

router.get('/', (req, res) => res.redirect('/books/bookForm'));

router.get('/bookForm', bookForm);

router.post('/saveBooks', saveBooks);

router.post('/deleteButton',deleteButton)

router.post('/newBook',newBook)

router.post('/borrarHistoria',borrarHistoria)

module.exports = router;