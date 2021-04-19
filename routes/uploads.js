const { check } = require('express-validator');
const { Router } = require('express');
const { cargarArchivo, actualizarImagen,mostrarImage,actualizarImagenCloudinary } = require('../controllers/uploads')

const {coleccionesPermitidas} = require('../helpers')
const { validarCampos, validarArchivo} = require('../middlewares/index');

const router= Router();

router.get('/:coleccion/:id',[
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) )
    ],mostrarImage);

router.post('/',validarArchivo,cargarArchivo)
router.put('/:coleccion/:id',[
    validarArchivo,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
    validarCampos
],actualizarImagenCloudinary);
//actualizarImagen)

module.exports = router;