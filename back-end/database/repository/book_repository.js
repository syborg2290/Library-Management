import { BookModel } from "../models/Book.js";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";
import { pagination } from "./pagination.js";

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
  
  //get all book with pagination
  async GetAllBooks({ page }) {
    try {
      const res = await pagination(BookModel, page, 20, true, true, "author"); // populate author
      const books = res.results;
      //check avilability of book and error handling
      if (!books) {
        return {
          error: true,
          result: "Not found any books!",
        };
      }
      if (books.length === 0) {
        return {
          error: true,
          result: "Not found any books!",
        };
      }

      return {
        error: false,
        result: books,
        currentPage: Number(res.pag.currentPage),
        numberOfPages: res.pag.pagesCount,
      };
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Invalid operations!"
      );
    }
  }

  async FindBookById({ id, req }) {
    try {
      const existingBook = await BookModel.findById(id)
        .populate("author")
        .exec();
      //check avilability of specific author and error handling
      if (!existingBook) {
        return {
          error: true,
          result: "Not found any book for the provided id!",
        };
      }
      return {
        error: false,
        result: existingBook,
      };
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Book"
      );
    }
  }

  async FindBookByIdAndUpdate({ id, newData }) {
    try {
      const existingBook = BookModel.findById(id);
      //check avilability for the update
      if (!existingBook) {
        return {
          error: true,
          result: "Not found any book for the provided id!",
        };
      }
      const updatedBookRes = await BookModel.findByIdAndUpdate(
        { _id: id },
        newData,
        { new: true }
      );
      return {
        error: false,
        result: updatedBookRes,
      };
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to find book or update author"
      );
    }
  }

  async IsBooksAlreadyRegistered({ name, isbn }) {
    try {
      const existingBookWithName = await BookModel.find({
        name,
      });
      const existingBookWithIsbn = await BookModel.find({
        isbn,
      });
      //Validating book name and ISBN
      return existingBookWithName.length === 0 &&
        existingBookWithIsbn.length === 0
        ? false
        : true;
    } catch (err) {
      throw APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Failed!");
    }
  }
}

export default BookRepository;
