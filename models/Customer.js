const mongoose = require("mongoose");
const Joi = require("joi");

// Define course schema
const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: "You must enter a name.",
      minlength: 3,
      maxlength: 50,
      trim: true
    },
    isGold: {
      type: Boolean,
      default: false
    },
    phone: {
      type: String,
      required: "You must enter a telephone number",
      trim: true
    }
  })
);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    phone: Joi.string().required()
  };
  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
