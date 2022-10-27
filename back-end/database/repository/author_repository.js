import { AuthorModel } from "../models/Author.js";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../../utils/app-errors.js";

class AuthorRepository {
  async CreateAuthor({ first_name, last_name }) {
    try {
      const author = new AuthorModel({
        first_name,
        last_name,
      });
      const authorResult = await author.save();
      return authorResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Author"
      );
    }
  }

  async GetAllAuthors() {
    try {
      const authors = await AuthorModel.find();
      //check avilability of authors and error handling
      if (authors.length === 0) {
        return {
          error: true,
          result: "Not found any authors!",
        };
      }

      return { error: false, result: authors };
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Invalid operations!"
      );
    }
  }

  async FindAuthorById({ id }) {
    try {
      const existingAuthor = await AuthorModel.findById(id);
      //check avilability of specific author and error handling
      if (!existingAuthor) {
        return {
          error: true,
          result: "Not found any author for the provided id!",
        };
      }
      return {
        error: false,
        result: existingAuthor,
      };
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Author"
      );
    }
  }

  async FindAuthorByIdAndUpdate({ id, newData }) {
    try {
      const existingAuthor = AuthorModel.findById(id);
      //check avilability for the update
      if (!existingAuthor) {
        return {
          error: true,
          result: "Not found any author for the provided id!",
        };
      }
      const updatedAuthorRes = await AuthorModel.findByIdAndUpdate(
        { _id: id },
        newData,
        { new: true }
      );
      return {
        error: false,
        result: updatedAuthorRes,
      };
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to find Author or update author"
      );
    }
  }

  async FindNameByAuthor({ first_name, last_name }) {
    try {
      const existingAuthor = await AuthorModel.findOne({
        first_name: first_name,
        last_name: last_name,
      });
      return existingAuthor;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Author"
      );
    }
  }
}

export default AuthorRepository;
