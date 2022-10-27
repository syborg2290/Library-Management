import AuthorRepository from "../database/repository/author_repository.js";
import AuthorDto from "../dto/AuthorDTO.js";
import {
  APIError,
  BadRequestError,
  STATUS_CODES,
} from "../utils/app-errors.js";
import { FormateData } from "../utils/utils.js";

class AuthorService {
  constructor() {
    this.repository = new AuthorRepository();
  }

  async CreateAuthor(authorInputs, res) {
    const dto = new AuthorDto(authorInputs);
    const first_name = dto.first_name;
    const last_name = dto.last_name;

    try {
      if (first_name || last_name !== null) {
        if (first_name || last_name !== "") {
          const existingAuthor = await this.repository.FindNameByAuthor({
            first_name,
            last_name,
          });

          if (!existingAuthor) {
            const authorRes = await this.repository.CreateAuthor({
              first_name,
              last_name,
            });

            return res.status(STATUS_CODES.OK).send({
              data: authorRes,
              message: "New author is added!",
            });
          } else {
            return res.status(STATUS_CODES.BAD_REQUEST).send({
              data: null,
              message: "Author is already in the database!",
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

  async getAuthors(res) {
    try {
      const authorsRes = await this.repository.GetAllAuthors();
      if (authorsRes.error) {
        return res.status(STATUS_CODES.NOT_FOUND).send({
          data: null,
          message: authorsRes.result,
        });
      }
      return res.status(STATUS_CODES.OK).send({
        data: authorsRes.result,
      });
    } catch (err) {
      throw new APIError("Invalid operation", err);
    }
  }

  async GetAuthorFromId(id, res) {
    try {
      const authorRes = await this.repository.FindAuthorById({ id });
      if (authorRes.error) {
        return res.status(STATUS_CODES.NOT_FOUND).send({
          data: null,
          message: authorRes.result,
        });
      }

      return res.status(STATUS_CODES.OK).send({
        data: authorRes.result,
      });
    } catch (err) {
      throw new APIError("Invalid operation", err);
    }
  }
}

export default AuthorService;
