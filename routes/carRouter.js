const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

// Ajouter une voiture
router.post("/addCar", carController.addCar);
router.post("/addCarWithOwner/:id", carController.addCarWithOwner);
module.exports = router;