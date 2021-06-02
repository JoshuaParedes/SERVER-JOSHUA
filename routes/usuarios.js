//Realizar un desestructuracion para sacar Router de express
const {Router} =require('express');
const { check } = require('express-validator');
const Rol=require('../models/rol');

const { usuariosGet } = require('../controller/usuarios.controlador');
const { usuariosPost } = require('../controller/usuarios.controlador');
const { usuariosPut } = require('../controller/usuarios.controlador');
const { usuariosDelete } = require('../controller/usuarios.controlador');
const { usuariosPatch } = require('../controller/usuarios.controlador');
const { rolValido } = require('../helpers/validadores-db');
const { validarCampos,validarCorreo } = require('../middlewares/validar-campos');

const rutas=Router();

rutas.get('/',usuariosGet);
rutas.put('/:id',usuariosPut);
rutas.post('/',[
    check('nombre','EL NOMBRE ES OBLIGATORIO').not().isEmpty(),
    check('password','EL PASSWORD ES OBLIGATORIO Y MINIMO 6 CARACTERES').isLength({min:6}),
    check('correo','EL CORREO NO ES VALIDO').isEmail(),
    check('correo').custom(validarCorreo),
    //check('rol','ROL NO PERMITIDO').isIn(['ROL_ADMIN','ROL_USUARIO']),
    check('rol').custom(rolValido),
    validarCampos
],usuariosPost);
rutas.delete('/:id',usuariosDelete);
rutas.patch('/',usuariosPatch);

module.exports=rutas;