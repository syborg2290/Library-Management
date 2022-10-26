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

  async FindUserByAuthor({ first_name, last_name }) {
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
