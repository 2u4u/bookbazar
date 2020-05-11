const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = _.isEmpty(data.name) ? "" : data.name;
  data.email = _.isEmpty(data.email) ? "" : data.email;
  data.password = _.isEmpty(data.password) ? "" : data.password;
  data.password2 = _.isEmpty(data.password2) ? "" : data.password2;

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name length should be between 2 and 30";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Field name is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Field email is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email format is incorrect";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Field password is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password length should be between 6 and 30";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Field password2 is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords should be equal";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
