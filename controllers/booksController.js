const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyAQdpATQeJk3Pg-DejkJXZJIdcbikCRYco');
// The Gemini 1.5 models are versatile and work with most use cases


const ListaLibros = [];
let respuesta = ""; 
const apiKey = "AIzaSyD0gDuYwJwjyxhqA4vMceUQxHNsLOB0uy4";
const apiAi = "AIzaSyAQdpATQeJk3Pg-DejkJXZJIdcbikCRYco";
//const pokemonList = {};

const bookForm = async (req, res) => {
    respuesta = "";
    res.render("books/formBooks", {
        title: "Nuevo Libro",
        ListaLibros,
        respuesta
    });
}

const saveBooks = async(req, res) => {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.book}&key=${apiKey}`);
    const DetalleLibro = response.data.items[0];
    //Verificar si la consulta encontro algo
    if (!DetalleLibro) {
        return res.status(404).send('Book not found');
    }

    // Verificar si el libro ya está en la colección por ID
    const bookExists = ListaLibros.some(book => book.id === DetalleLibro.id);
    if (bookExists) {
        return res.status(400).send('Book already exists in the collection');
    }else{
        ListaLibros.push(DetalleLibro);
    }
    res.render("books/formBooks", {
        title: "Nuevo Libro",
        ListaLibros,
        respuesta
    });
}

const deleteButton = async(req,res) =>{
    const bookId = req.body.nombreLibro;
    const bookIndex = ListaLibros.findIndex(book => book.id === bookId);
    if (!bookIndex !== -1) {
        ListaLibros.splice(bookIndex, 1);
    } 
    res.render("books/formBooks", {
        title: "Nuevo Libro",
        ListaLibros,
        respuesta
    });
}

const newBook = async(req,res) =>{
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"})
    let titulos = [];
    if (!ListaLibros.length) {
        return res.status(404).send('Todavia no hay titulos registrados');
        } else {
        titulos = ListaLibros.map(libro => libro.volumeInfo.title);
    }
    const textoAnalizar = "Crear una nueva historia donde interactuen los personajes principales de estos libros " + titulos; 
    try {
        const result = await model.generateContent(textoAnalizar);
        const response = await result.response;
        respuesta = response.text();
        res.render("books/formBooks", {
            title: "Nuevo Libro",
            ListaLibros,
            respuesta
        });
      } catch (error) {
        console.error('Error al hacer la solicitud a la API de Google Language:', error.response ? error.response.data : error.message);
    }
}

const borrarHistoria = async(req,res) =>{

    res.redirect('bookForm')
}

module.exports = {
    bookForm,
    saveBooks,
    deleteButton,
    newBook,
    borrarHistoria
}