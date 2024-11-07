const MESSAGES = {
  SUCCESS: {
    SIGNUP: "Successfully created a new user",
  },
  ERROR: {
    DEFAULT: "System encountered an unexpected error",
    DATABASE_ERROR: "Error while interacting with database",
    INVALID_PASSWORD: "Password must be at least 8 characters long",
    EMAIL_EXISTS: "Email already registered",
    USER_NOT_FOUND: "User not found",
    INVALID_EMAIL: "Please enter a valid email",
    WRONG_PASSWORD: "Password you entered is wrong. Please try again",
    INVALID_EMAIL_INPUT:
      "Something went wrong while authenticating your email. Please try again later",
    INVALID_EMAIL_PASSWORD:
      "Something went wrong while authenticating your password. Please try again later",
  },
};

const HTTP_STATUS_MESSAGES = {
  OK: "Success",
  CREATED: "Successfully created",
  BAD_REQUEST: "Bad request",
  INTERNAL_SERVER_ERROR: "Internal server error",
};

module.exports = {
  MESSAGES,
  HTTP_STATUS_MESSAGES,
};
