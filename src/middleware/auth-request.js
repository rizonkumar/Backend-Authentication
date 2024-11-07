const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { MESSAGES } = require("../utils/constants");

function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_EMAIL_INPUT;
    ErrorResponse.error = new AppError(
      [MESSAGES.ERROR.INVALID_EMAIL],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message = MESSAGES.ERROR.INVALID_EMAIL_PASSWORD;
    ErrorResponse.error = new AppError(
      [MESSAGES.ERROR.INVALID_PASSWORD],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = { validateAuthRequest };
