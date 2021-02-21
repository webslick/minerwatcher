const { body } = require('express-validator/check');

const validators = {
  userValidator: [
    body('email')
    .not()
    .isIn(['123', 'password', 'god'])
    .withMessage('Do not use a common word as the password')
    .isLength({ min: 5 })
    .matches(/\d/)
  ]
}

module.exports = validators;

