/* eslint-disable max-classes-per-file */
class UserUnauthorizedError extends Error { }

class UserForbiddenError extends Error { }

class UserNotFoundError extends Error { }

export { UserUnauthorizedError, UserForbiddenError, UserNotFoundError };
