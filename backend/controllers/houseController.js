const asyncHandler = require("express-async-handler");
const { request, globalAgent } = require("http");

const House = require("../models/houseModel");

// @desc    Get houses
// @route   GET /api/houses
// @access  Public
const getHouses = asyncHandler(async (req, res) => {
  const houses = await House.find();

  res.status(200).json(houses);
});

// @desc    Set houses
// @route   POST /api/houses
// @access  Private
const setHouse = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const house = await House.create({
    text: req.body.text,
  });

  res.status(200).json(house);
});

// @desc    Update house
// @route   PUT /api/houses/:id
// @access  Private
const updateHouse = asyncHandler(async (req, res) => {
  const house = await House.findById(req.params.id);

  if (!house) {
    res.status(400);
    throw new Error("House not found");
  }

  const updatedHouse = await House.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedHouse);
});

// @desc    Delete house
// @route   DELETE /api/houses/:id
// @access  Private
const deleteHouse = asyncHandler(async (req, res) => {
  const house = await House.findById(req.params.id);

  if (!house) {
    res.status(400);
    throw new Error("House not found");
  }

  await house.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getHouses,
  setHouse,
  updateHouse,
  deleteHouse,
};
