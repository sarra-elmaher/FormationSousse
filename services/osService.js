const os = require("os")

module.exports.getData = async ()=>{
    try {
    const osInformation ={
      hostname : os.hostname(),
      platform : os.platform(),
      type : os.type(),
      release : os.release()
    }
    console.log(osInformation)
    return osInformation
    
  } catch (error) {
      throw new error ('erreur lors de la récupération des informations');
  }
}