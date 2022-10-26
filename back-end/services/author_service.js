import AuthorRepository from "../database/repository/author_repository.js";
import { APIError, BadRequestError } from "../utils/app-errors.js";
import { FormateData } from "../utils/utils.js";

class AuthorService {
  constructor() {
    this.repository = new AuthorRepository();
  }

  async CreateAuthor(authorInputs, res) {
    const { first_name, last_name } = authorInputs;

    try {
      if (first_name || last_name !== null) {
        if (first_name || last_name !== "") {
          const existingAuthor = await this.repository.FindUserByAuthor({
            first_name,
            last_name,
          });

          if (!existingAuthor) {
            const authorRes = await this.repository.CreateAuthor({
              first_name,
              last_name,
            });

            return res.status(201).send({
              data: authorRes,
              message: "New author is added!",
            });
          } else {
            return FormateData({
              message: "Author is already in the database!",
            });
          }
        } else {
          return FormateData({
            message: "Values can not be empty!",
          });
        }
      }
      return FormateData({
        message: "Values can not be null!",
      });
    } catch (err) {
      throw new APIError("Invalid operation", err);
    }
  }
}

export default AuthorService;
