const userModel = require ("../Models/userModel")
const carModel = require ("../Models/carModel")
module.exports.esmFonction = async (req,res ) => {
    try {
        res.status(200).json({})
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
}
module.exports.getAllUsers = async (req,res ) => {
    try {
        const usersList = await userModel.find()

        res.status(200).json({usersList})
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
}
module.exports.getUserById = async (req,res ) => {
    try {
        //logique
        const id = req.params.id
        const user = await userModel.findById(id)

        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
}
module.exports.getUserByAge= async (req,res ) => {
    try {
        //logique
        const age = req.params.age
        const user = await userModel.find({age : {$gte :age}}).sort({age : 1}).limit(2)

        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
}
module.exports.getUserBetweenAgeXAndY= async (req,res ) => {
    try {
        //logique
        const minAge = req.body.minAge
        const maxAge = req.body.maxAge
        if (isNaN(minAge)|| isNaN (maxAge)){
            throw new Error("minAge et maxAge non null");
        }
        if (minAge> maxAge){
            throw new Error("minAge < maxAge");
        }
        
        const user = await userModel.find({age : {$gte :minAge, $lte: maxAge}})

        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
}
module.exports.addClient = async (req,res ) => {
    try {
        const {firstName, lastName, email, password, age}= req.body
        const role = "client";
        const user = new userModel ({firstName, lastName, email, password, age})
        const addUser = await user.save()
        res.status(200).json({addUser})
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
}
module.exports.getAllUsersSortedByFirstName = async (req,res ) => {
    try {
        //logique
        const usersList = await userModel.find().sort({firstName: 1})
        const count= usersList.length

        res.status(200).json({ count, usersList})
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
}
module.exports.searchUserByFirstName = async (req,res ) => {
    // ?name=John
    try {
        //logique
          const {firstName}= req.body;
        if(!firstName){
            throw new Error ("please select a name");
        }
        const userList = await userModel.find({
            firstName: {$regex: firstName, $options: "i"},/*debut
            firstName: {$regex: '${firstName}$' , $option: "i"} fin */
        })
        if (userList.length ===0){
            throw new Error ("Aucun utilisateur pour ce nom")
        }
        res.status(200).json({ userList})
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
}

module.exports.deleteUserById = async (req,res ) => {
    try {
        //logique
        const id = req.params.id;
        const user = await userModel.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
}
module.exports.addClientV2 = async (req,res ) => {
    try {
        //logique
        const userData = req.body;
        userData.role = "member";
        const user = new userModel (userData);
        const addUser = await user.save();
        res.status(200).json({addUser});
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
}
module.exports.addClientWithImage = async (req,res ) => {
    try {
        const userData = req.body;
        userData.role = "member";
        if(req.file){
            const {filename}=req.file
            userData.user_Image= filename
        }
        const user = new userModel (userData);
        const addUser = await user.save();
        res.status(200).json({addUser});
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
}
module.exports.UpdateUser = async (req,res ) => {
    try {
        //logique
        const {id }= req.param; //get id from prams
        const {firstName, lastName, age, email} = req.body;
        const checkIfUserExists = await userModel.findById(id)
        if (!checkIfUserExists){
            throw new Error("user not found !");

        }
        updateUser= await userModel.findByIdAndUpdate(id, {
            $set: {firstName, lastName, age, email},
        });
        res.status(200).json({updateUser})
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }

}
module.exports.deleteUserByIdAndRelation = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndDelete(id);
        await carModel.updateMany({owner : id}, {$unset: {owner: ""}})
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({message : error.message});
        
    }

}

const jwt = require ('jsonwebtoken')
const maxAge = 1*60 // une minute

const createToken = (id) =>{
  return jwt.sign({id}, 'net sousse secret', {expiresIn :maxAge })

}

module.exports.login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await userModel.login(email, password)
        const token = createToken(user._id)
        res.cookie("tokenJwt", token , {httpOnly : false, maxAge : maxAge*1000 })
    
        res.status(200).json({ message : "user logged in", user: user})
    } catch (error) {
        res.status(500).json({message : error.message});
        
    }

}
module.exports.logout = async (req, res) => {
    try {
        res.cookie("tokenJwt", "" , {httpOnly : false, maxAge : 1 })

    
        res.status(200).json({ message : "user logged out", user: user})
    } catch (e) {
        res.status(500).json({message : e.message});
        
    }
}
module.exports.getAuthUser = async (req,res ) => {
    try {
        //logique
    
        const user = await userModel.findById(req.user._id)

        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }

}

