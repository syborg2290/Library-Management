import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

API.interceptors.response.use(
  function (response) {
    // if (response.status === 400) {
    //   console.log("res : ", response);
    // }
    return response;
  },
  function (error) {
    return error.response;
  }
);

export const getBooks = (page) => API.get(`/books?page=${page}`);

export const getBookById = (id) => API.get(`/book/${id}`);

export const createBook = (newBook) => API.post("/book", newBook);

export const updateBook = (id, updatedBook) =>
  API.put(`/book/${id}`, updatedBook);

//author
export const getAuthors = () => API.get("/authors");

export const getAuthorById = (id) => API.get(`/autho/${id}`);

export const createAuthor = (author) => API.post("/author", author);

export const updateAuthor = (id, updatedAuthor) =>
  API.put(`/author/${id}`, updatedAuthor);
