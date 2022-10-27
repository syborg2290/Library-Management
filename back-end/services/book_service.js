import BookRepository from "../database/repository/book_repository.js";
import AuthorRepository from "../database/repository/author_repository.js";
import BookDto from "../dto/BookDTO.js";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../utils/app-errors.js";
import { ValidateIsbn } from "../utils/utils.js";

class BookService {
  constructor() {
    this.repository = new BookRepository();
    this.authorRepository = new AuthorRepository();
  }

  async CreateBook(bookInputs, res) {
    const dto = new BookDto(bookInputs);
    const name = dto.name;
    const isbn = dto.isbn;
    const authorId = dto.authorId;

    // validating book isbn
    try {
      if (name || isbn || authorId !== null) {
        if (name || isbn || authorId !== "") {
          if (ValidateIsbn(isbn) === false) {
            return res.status(STATUS_CODES.BAD_REQUEST).send({
              data: null,
              message: "Invalid isbn format!",
            });
          }
          const existingAuthor = await this.authorRepository.FindAuthorById(
            authorId
          );
          //check avilability of specific author and error handling
          if (!existingAuthor.error) {
            return res.status(STATUS_CODES.BAD_REQUEST).send({
              data: null,
              message: "Not found any author for the provided id!",
            });
          }

          const isExistingBook = await this.repository.IsBooksAlreadyRegistered(
            {
              name,
              isbn,
            }
          );

          //validate avilability and error handling
          if (!isExistingBook) {
            const bookRes = await this.repository.CreateBook({
              name,
              isbn,
              authorId,
            });

            return res.status(STATUS_CODES.OK).send({
              data: bookRes,
              message: "New Book is added!",
            });
          } else {
            return res.status(STATUS_CODES.BAD_REQUEST).send({
              data: null,
              message: "Book is already in the database!",
            });
          }
        } else {
          return res.status(STATUS_CODES.BAD_REQUEST).send({
            data: null,
            message: "Values can not be empty!",
          });
        }
      }
      return res.status(STATUS_CODES.BAD_REQUEST).send({
        data: null,
        message: "Values can not be null!",
      });
    } catch (err) {
      throw new APIError("Invalid operation", err);
    }
  }

  async getBooks(res) {
    try {
      const booksRes = await this.repository.GetAllBooks();

      //error handling
      if (booksRes.error) {
        return res.status(STATUS_CODES.NOT_FOUND).send({
          data: null,
          message: booksRes.result,
        });
      }
      return res.status(STATUS_CODES.OK).send({
        data: booksRes.result,
      });
    } catch (err) {
      throw new APIError("Invalid operation", err);
    }
  }

  async GetBookFromId(id, res) {
    try {
      const bookRes = await this.repository.FindBookById({ id, });
      //error handling
      if (bookRes.error) {
        return res.status(STATUS_CODES.NOT_FOUND).send({
          data: null,
          message: bookRes.result,
        });
      }

      return res.status(STATUS_CODES.OK).send({
        data: bookRes.result,
      });
    } catch (err) {
      throw new APIError("Invalid operation", err);
    }
  }
}

export default BookService;
