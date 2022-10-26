import AuthorService from "../services/author_service.js";
import { body, validationResult } from "express-validator";

export const author = (app) => {
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
        const { data } = await service.CreateAuthor(
          { first_name, last_name },
          res
        );
        return res.json(data);
      } catch (err) {
        next(err);
      }
    }
  );
};
