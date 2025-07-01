const Joi = require("joi");

const eventValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    name: Joi.string().min(3).max(100).required(),
    dateTime: Joi.date().required(),
    location: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(500).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

module.exports = {
  eventValidation,
};
