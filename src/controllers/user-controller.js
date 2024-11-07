const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { UserService } = require("../services");
const { MESSAGES } = require("../utils/constants");

async function signUp(req, res) {
  try {
    const user = await UserService.create({
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = user;
    SuccessResponse.message = MESSAGES.SUCCESS.SIGNUP;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    ErrorResponse.message = error.message || MESSAGES.ERROR.DEFAULT;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

async function signIn(req, res) {
  try {
    const user = await UserService.signin({
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    ErrorResponse.message = error.message || MESSAGES.ERROR.DEFAULT;
    return res
      .status(error.statusCode || StatusCodes.UNAUTHORIZED)
      .json(ErrorResponse);
  }
}

module.exports = { signUp, signIn };
