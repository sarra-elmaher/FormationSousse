const userModel = require ("../Models/userModel")
const carModel = require("../Models/carModel");

// Ajouter une voiture
module.exports.addCar = async (req, res) => {
  try {
    const carData = req.body;

    const newCar = new carModel(carData);
    const savedCar = await newCar.save();

    res.status(201).json({
      message: "Voiture ajoutée avec succès ✅",
      car: savedCar,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.addCarWithOwner= async (req,res ) => {
    try {
        //logique
        const carData = req.body; //get id from prams
        const idOwner = req.params.id;
        carData.owner = idOwner
        //vérifier si le matricule existe déja
        const existingCar = await carModel.findOne({matricule: carData.matricule.toUpperCase()});
        if (existingCar){
            return res.status(400).json({message : "une voiture avec ce matricule existe déja"});

        }
        const car= new carModel(carData)
        const addedCar = await car.save() 
        await userModel.findByIdAndUpdate(idOwner, {
            // $set :{car : addedCar._id} une seule car
            $push : {cars : addedCar._id}
        })  
        res.status(201).json({addedCar})
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
}
module.exports.affectCarToUser = async (req, res) => {
  try {
    const { carID,ownerID } = req.body;
    
    const user = await userModel.findById(ownerID)
    if(!user){
        throw new Error("user not found");        
    }

    const car = await carModel.findById(carID)
    if(!car){
        throw new Error("car not found");        
    }

    await carModel.findByIdAndUpdate(carID,{
        $set: { owner : ownerID}
        
    })
    await userModel.findByIdAndUpdate(ownerID,{
        //$set: { car : carID}
        $push : {cars : carID}
    })

    res.status(201).json({
      success: true,
      message: 'Voiture créée avec succès',
      data: "affected"
    });
  } catch (error) {
    console.error('Erreur lors de la création de la voiture:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Erreur lors de la création de la voiture',
      error: error.message
    });
  }
};
module.exports.desaffectCarToUser = async (req, res) => {
  try {
    const { carID,ownerID } = req.body;
    
    const user = await userModel.findById(ownerID)
    if(!user){
        throw new Error("user not found");        
    }

    const car = await carModel.findById(carID)
    if(!car){
        throw new Error("car not found");        
    }

    await carModel.findByIdAndUpdate(carID,{
        $unset: { owner : ""}        
    })

    await userModel.findByIdAndUpdate(ownerID,{
        //$set: { car : carID}
        $pull : {cars : carID}
    })

    res.status(201).json({
      success: true,
      message: 'Voiture créée avec succès',
      data: "affected"
    });
  } catch (error) {
    console.error('Erreur lors de la création de la voiture:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Erreur lors de la création de la voiture',
      error: error.message
    });
  }
};
// Supprimer une voiture
module.exports.deleteCarById = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await carModel.findByIdAndDelete(id);
    
    if (!car) {
      return res.status(404).json({ message: "Voiture non trouvée" });
    }
    
    await userModel.updateMany({},{$pull : {cars : id}})

    res.status(200).json({ message: "Voiture supprimée avec succès", deletedCar: car });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
