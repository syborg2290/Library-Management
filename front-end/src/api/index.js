import axios from "axios";

const API=axios.create({baseURL:'http://localhost:5001'});


export const getBooks = (page) => API.get(`/books?page=${page}`);

export const getBookById=(id)=> API.get(`/book/${id}`);

export const createBook = (newBook) => API.post('/book', newBook);

export const updateBook = (id, updateBook) => API.put(`/book/${id}`, updateBook);

//author
export const getAuthor = () => API.get('/authors');

export const getAuthorById=(id)=> API.get(`/autho/${id}`);

export const createAuthor = (newBook) => API.post('/author', newBook);

export const updateAuthor = (id, updateAuthor) => API.put(`/author/${id}`, updateAuthor);