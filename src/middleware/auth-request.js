const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { MESSAGES } = require("../utils/constants");
const { UserService } = require("../services");

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

async function checkAuth(req, res, next) {
  try {
    const response = await UserService.isAuthenticated(
      req.headers["x-access-token"]
    );
    if (response) {
      req.user = response; // add user to request object
      next();
    }
  } catch (error) {
    ErrorResponse.error = error;
    ErrorResponse.message = error.message || MESSAGES.ERROR.TOKEN_NOT_FOUND;
    return res
      .status(error.statusCode || StatusCodes.UNAUTHORIZED)
      .json(ErrorResponse);
  }
}

module.exports = { validateAuthRequest, checkAuth };
