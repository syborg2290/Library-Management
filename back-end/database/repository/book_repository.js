import { BookModel } from "../models/Book.js";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";

class BookRepository {
  async CreateBook({ name, isbn, authorId }) {
    try {
      const book = new BookModel({
        name,
        isbn,
        author: authorId,
      });
      const bookResult = await book.save();
      return bookResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create New Book"
      );
    }
  }

  async IsBooksAlreadyRegistered({ name, isbn }) {
    try {
      const existingBook = await BookModel.findOne({
        name,
        isbn,
      });
      return existingBook;
    } catch (err) {
      throw APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Failed!");
    }
  }
}

export default BookRepository;
