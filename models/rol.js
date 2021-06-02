const {Schema,model} = require('mongoose');

const RolSchema = Schema({
    rol: {
        type:String,
        required:[true,'EL ROL ES REQUERIDO']
    }
});

module.exports=model('Rol',RolSchema);