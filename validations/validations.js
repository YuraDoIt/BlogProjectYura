import { body } from "express-validator";

export const loginValidation = [
  body("email").isEmail(),
  body("password").isString().isLength({ min: 5 }),
];

export const registerValidation = [
  body("email").isEmail(),
  body("password").isString().isLength({ min: 5 }),
  body("fullName").isLength({ min: 5 }),
  body("avatarUrl").optional().isURL(),
];

export const postValidation = [
  body("title", "Введіть заголовок").isString(),
  body("text", "Введіть текст статті").isString().isLength({ min: 3 }),
  body("tags", "Невірний формат тегів має бути масив").optional().isArray(),
  body("imageUrl", "Нверіна ссилка на зображення").optional().isString(),
];
