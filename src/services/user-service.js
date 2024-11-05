const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories");
const AppError = require("../utils/common/app-error");
const { MESSAGES } = require("../utils/constants");

const userRepo = new UserRepository();

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

module.exports = { create };
