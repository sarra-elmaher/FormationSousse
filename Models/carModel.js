// models/car.model.js
const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    make: { type: String, required: true, trim: true },   // Marque (ex: Toyota)
    model: { type: String, required: true, trim: true },  // Modèle (ex: Corolla)
    year: { type: Number, required: true },               // Année
    color: { type: String, trim: true },                  // Couleur
    mileage: { type: Number, default: 0 },                // Kilométrage
    fuelType: { type: String, trim: true },               // Type carburant (essence, diesel…)
    transmission: { type: String, trim: true },           // Transmission (auto, manuelle)
    price: { type: Number, min: 0 },                      // Prix
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Propriétaire lié (User)
  },
  { timestamps: true }
);

 const Car  = mongoose.model("Car", carSchema)
module.exports= Car;