const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = _.isEmpty(data.email) ? "" : data.email;
  data.password = _.isEmpty(data.password) ? "" : data.password;

  if (Validator.isEmpty(data.email)) {
    errors.email = "Field email is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email has incorrect format";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Field password is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
