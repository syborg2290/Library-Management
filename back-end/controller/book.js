import BookService from "../services/book_service.js";
import { body, validationResult } from "express-validator";
import BookDTO from "../dto/BookDTO.js";
import { STATUS_CODES } from "../utils/app-errors.js";

export const bookController = (app) => {
  const service = new BookService();

  app.post(
    "/book/:page",
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

  //get all book
  app.get("/books", async (req, res, next) => {
    try {
      let page = req.query.page;
      const { data } = await service.getBooks(page, res);
      console.log(data);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  //get book by id
  app.get("/book/:id", async (req, res, next) => {
    try {
      const id = req.params.id;

      //validating book_id and error handling
      if (id === undefined || id === null) {
        return res.sendStatus(STATUS_CODES.BAD_REQUEST);
      }
      const { data } = await service.GetBookFromId(id, res);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  //update book by id
  app.put("/book/update/:id", async (req, res, next) => {
    try {
      const id = req.params.id; // get id from request header
      const newData = req.body; // get value from request body
      if (!newData) {
        return res.sendStatus(STATUS_CODES.BAD_REQUEST);
      }

      const { data } = await service.GetBookByIdAndUpdate(id, newData, res);
      return res.json(data);
    } catch (error) {
      next(err);
    }
  });
};
