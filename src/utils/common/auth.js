const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
// const AppError = require("../utils/common/app-error");
const { MESSAGES } = require("../constants");
const { ServerConfig } = require("../../config");

async function checkPassword(plainPassword, hashedPassword) {
  try {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  } catch (error) {
    throw new AppError(
      MESSAGES.ERROR.DEFAULT,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function createToken(input) {
  try {
    return jwt.sign(input, ServerConfig.JWT_SECRET, {
      expiresIn: ServerConfig.JWT_EXPIRY,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { checkPassword, createToken };
