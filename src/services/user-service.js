const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories");
const AppError = require("../utils/common/app-error");
const { MESSAGES } = require("../utils/constants");
const userRepo = new UserRepository();
const { Auth } = require("../utils/common");

async function create(data) {
  try {
    if (data.password.length < 8) {
      throw new AppError(
        MESSAGES.ERROR.INVALID_PASSWORD,
        StatusCodes.BAD_REQUEST
      );
    }
    const user = await userRepo.create(data);
    return user;
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      let explanation = error.errors.map((err) => {
        if (err.type === "unique violation" && err.path === "email") {
          return MESSAGES.ERROR.EMAIL_EXISTS;
        }
        if (err.validatorKey === "isEmail") {
          return MESSAGES.ERROR.INVALID_EMAIL;
        }
        return err.message;
      });
      throw new AppError(explanation[0], StatusCodes.BAD_REQUEST);
    }
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      MESSAGES.ERROR.DEFAULT,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function signin(data) {
  try {
    const user = await userRepo.getUserByEmail(data.email);
    if (!user) {
      throw new AppError(MESSAGES.ERROR.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    const passwordMatch = Auth.checkPassword(data.password, user.password);
    console.log("passwordMatch", passwordMatch);
    if (!passwordMatch) {
      throw new AppError(MESSAGES.ERROR.WRONG_PASSWORD, StatusCodes.NOT_FOUND);
    }
    const jwt = Auth.createToken({ id: user.id, email: user.email });
    return jwt;
  } catch (error) {
    throw error;
  }
}

async function isAuthenticated(token) {
  try {
    if (!token) {
      throw new AppError(
        MESSAGES.ERROR.TOKEN_NOT_FOUND,
        StatusCodes.UNAUTHORIZED
      );
    }
    const response = Auth.verifyToken(token);
    const user = await userRepo.get(response.id);
    if (!user) {
      throw new AppError(MESSAGES.ERROR.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    return user.id;
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error.name === "JsonWebTokenError") {
      throw new AppError(
        MESSAGES.ERROR.INVALID_TOKEN,
        StatusCodes.UNAUTHORIZED
      );
    }
    if (error.name === "TokenExpiredError") {
      throw new AppError(
        MESSAGES.ERROR.TOKEN_EXPIRED,
        StatusCodes.UNAUTHORIZED
      );
    }
    console.log(error);
    throw error;
  }
}

module.exports = { create, signin, isAuthenticated };
