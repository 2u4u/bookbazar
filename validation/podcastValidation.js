const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateAddPost(data) {
  let errors = {};
  data.name = _.isEmpty(data.name) ? "" : data.name;

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Field "name" is required';
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
