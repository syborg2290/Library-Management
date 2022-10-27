import BookRepository from "../database/repository/book_repository.js";
import BookDto from "../dto/BookDTO.js";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../utils/app-errors.js";

class BookService {
  constructor() {
    this.repository = new BookRepository();
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
          const existingBook = await this.repository.IsBooksAlreadyRegistered({
            name,
            isbn,
          });

          //validate avilability and error handling
          if (!existingBook) {
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
}

export default BookService;
