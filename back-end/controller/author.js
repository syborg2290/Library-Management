import AuthorService from "../services/author_service.js";
import { body, validationResult } from "express-validator";
import AuthorDTO from "../dto/AuthorDTO.js";

export const authorController = (app) => {
  const service = new AuthorService();

  app.post(
    "/author",
    body("first_name").isLength({ min: 3 }),
    body("last_name").isLength({ min: 3 }),
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({ message: errors.array({ onlyFirstError: true }) });
      }
      try {
        const { first_name, last_name } = req.body;
        const dto = new AuthorDTO({ first_name, last_name });
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
};
