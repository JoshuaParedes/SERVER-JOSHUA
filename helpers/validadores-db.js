const Rol = require('../models/rol');

const rolValido = async(rol='') =>{
    const existeRol = await Rol.findOne({rol});
}

module.exports={
    rolValido
}