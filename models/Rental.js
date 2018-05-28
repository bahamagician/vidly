const mongoose = require("mongoose");
const Joi = require("joi");

// Define rental schema
const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
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
    }),
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: "You must enter a title.",
        minlength: 5,
        maxlength: 255,
        trim: true
      },
      dailyRentalRate: {
        type: Number,
        required: "Rental rate is required",
        min: 0,
        max: 50
      }
    })
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
});

// Define Rental Model
const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.rentalSchema = rentalSchema;
exports.validate = validateRental;
