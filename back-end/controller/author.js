import AuthorService from "../services/author_service.js";
import { body, validationResult } from "express-validator";
import AuthorDTO from "../dto/AuthorDTO.js";
import { STATUS_CODES } from "../utils/app-errors.js";

export const authorController = (app) => {
  const service = new AuthorService();

  app.post(
    "/author",
    body("first_name").isLength({ min: 3 }),
    body("last_name").isLength({ min: 3 }),
    async (req, res, next) => {
      const errors = validationResult(req);
      //validating and error handling
      if (!errors.isEmpty()) {
        return res.json({ message: errors.array({ onlyFirstError: true }) });
      }
      try {
        const { first_name, last_name } = req.body; // parse data using request body
        const dto = new AuthorDTO({ first_name, last_name }); //assign authorDto to new variable and parse using parameters
        const { data } = await service.CreateAuthor(dto, res);
        return res.json(data);
      } catch (err) {
        next(err);
      }
    }
  );

  app.get("/authors", async (req, res, next) => {
    try {
      const { data } = await service.getAuthors(res);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.put("/author/update/:id", async (req, res, next) => {
    try {
      const id = req.params.id; // get id from request header
      const newData = req.body; // get value from request body
      if (!newData) {
        return res.sendStatus(STATUS_CODES.BAD_REQUEST);
      }

      const { data } = await service.GetAuthorByIdAndUpdate(id, newData, res);
      return res.json(data);
    } catch (error) {
      next(err);
    }
  });

  app.get("/author/:id", async (req, res, next) => {
    try {
      const id = req.params.id;

      //validating author_id and error handling
      if (id === undefined || id === null) {
        return res.sendStatus(STATUS_CODES.BAD_REQUEST);
      }
      
      const { data } = await service.GetAuthorFromId(id, res);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
};
