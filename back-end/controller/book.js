import BookService from "../services/book_service.js";
import { body, validationResult } from "express-validator";
import BookDTO from "../dto/BookDTO.js";
import { STATUS_CODES } from "../utils/app-errors.js";

export const bookController = (app) => {
  const service = new BookService();

  app.post(
    "/book",
    body("name").notEmpty({ ignore_whitespace: true }),
    body("isbn").isString(),
    body("authorId").notEmpty({ ignore_whitespace: true }),
    async (req, res, next) => {
      const errors = validationResult(req);
      //validating and error handling
      if (!errors.isEmpty()) {
        return res.json({ message: errors.array({ onlyFirstError: true }) });
      }
      try {
        const { name, isbn, authorId } = req.body; // parse data using request body
        const dto = new BookDTO({ name, isbn, authorId }); //assign bookDto to new variable and parse using parameters
        const { data } = await service.CreateBook(dto, res);
        return res.json(data);
      } catch (err) {
        next(err);
      }
    }
  );
};
