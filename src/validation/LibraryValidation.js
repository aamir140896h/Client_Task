import Joi from "joi";

export const BookValidation = Joi.object({
  books: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      author: Joi.string().required(),
      ISBN: Joi.string().required(),
      publishedYears: Joi.number()
        .integer()
        .min(1000)
        .max(new Date().getFullYear())
        .required(),
      publisher: Joi.string().allow(""),
      category: Joi.string().required(),
    })
  ),
});

export const UpdateBookValidation = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  category: Joi.string(),
});

export const MemberValidation = Joi.object({
  member: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    joinDate: Joi.date().default(Date.now),
  }),
});

export const LoansValidation = Joi.object({
  loans: Joi.object({
    loanDate: Joi.date().default(Date.now),
    dueDate: Joi.date().required(),
    returnDate: Joi.date().required(),
    status: Joi.string()
      .valid("Borrowed", "Returned", "Overdue")
      .default("Borrowed"),
  }),
});
