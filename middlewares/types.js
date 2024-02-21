const { z } = require("zod");

const userInput = z.object({
  firstname: z.string(),
  lastname: z.string(),
  username: z.string(),
  password: z.string().min(5),
});

module.exports = {
  zUserInputValidation: userInput,
};
