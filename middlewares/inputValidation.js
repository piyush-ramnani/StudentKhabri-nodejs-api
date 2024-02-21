const { zUserInputValidation } = require("./types");

function userInputValidation(req, res, next) {
  const userInput = req.body;

  if (
    !userInput.firstname ||
    !userInput.lastname ||
    !userInput.lastname ||
    !userInput.password
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const validatedData = zUserInputValidation.safeParse(userInput);

  if (!validatedData.success) {
    return res.status(409).json({ message: "Wrong input type" });
  }

  req.userData = validatedData.data;
  next();
}

module.exports = {
  userInputValidation,
};
