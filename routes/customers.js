const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Customer, validate } = require("../models/Customer");

// View All Customers Route
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

// View a Specific Customer
router.get("/:id", async (req, res) => {
  const customer = await Customer.find({ _id: req.params.id });
  if (!customer) return res.status(404).send("That customer was not found");
  res.send(customer);
});

// Add New Customer Route
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  }).save();
  res.send(customer);
});

// Update a customer
router.put("/:id", async (req, res) => {
  // Validate customer and if it's invalid, return 400 - Bad Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update Customer
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    },
    { new: true }
  );

  // Throw error if it doesn't exist
  if (!customer) return res.status(404).send("That customer was not found");

  res.send(customer);
});

// Delete a Customer
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send("That customer was not found");

  // Return the customer
  res.send(customer);
});

module.exports = router;
