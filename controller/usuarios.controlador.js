const { response } = require('express');
const bcryptjs=require('bcryptjs');
const Usuario = require('../models/usuario');
const { validationResult, body } = require('express-validator');

const usuariosGet = async (req,res = response) => {
    //const body=req.body
    const usuario=await Usuario.find();

    res.json({
        mensaje: 'GET API CONTROLADOR',
        usuario
    });
}
const usuariosPost = async (req, res=response) => {
    /*
    const { nombre, ci } = req.body;
    res.json({
        mensaje: 'POST API CONTROLADOR',
    });
    */

  /*const body = req.body;
   const usuario = new Usuario(body);
   await usuario.save();
   res.json({
        mensaje: 'POST API CONTROLADOR',
        usuario
   });*/
   
 /*  const {nombre,correo,password, rol} = req.body;
   const usuario = new Usuario({nombre,corre,password,rol});
   //encriptar contraseña
   const salt=bcryptjs.genSaltSync();
   usuario.password=bcryptjs.hashSync(password,salt);
   usuario
   await usuario.save();
   res.json({
       mensaje: 'POST API CONTROLADOR',
       usuario
   });*/
    const {nombre,correo,password, rol} = req.body;
    const existeCorreo=await Usuario.findOne({correo});
    if(existeCorreo){
        return res.status(400).json({
            mensaje:'EL CORREO ESTA REGISTRADO'
        });
    }
    const usuario = new Usuario({nombre,correo,password, rol});
    const salt=bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync(password,salt);
    await usuario.save();
    res.json({
        mensaje: 'POST API CONTROLADOR - USUARIO CREADO',
        usuario
    });

}


const usuariosPut = async (req, res=response) => {
    const {id}=req.params;
    const {password,google,correo, ...resto} = req.body;
    if(password){
        const salt=bcryptjs.genSaltSync();
        resto.password=bcryptjs.hashSync(password,salt);
    }
    const usuario=await Usuario.findByIdAndUpdate(id,resto);
        res.json({
        mensaje: 'PUT API CONTROLADOR - ACTUALIZACION REALIZADA',
        usuario
    });
}

const usuariosDelete = async (req, res=response) => {
    const {id}=req.params;
    const usuario=await Usuario.findByIdAndDelete(id);

    res.json({
        mensaje: 'USUARIO ELIMINADO',
        usuario
    });
}

const usuariosPatch=(req,res)=>{
    
    res.json({
        mensaje:'PATCH API CONTROLADOR'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}