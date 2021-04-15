
const {check} = require('express-validator');
const { Router } = require('express');

const { obtenerCategorias,
        obtenerCategoria,
        crearCategoria,
        actualizarCategoria,
        borrarCategoria }= require('../controllers/categorias');

const {siExisteCategoria, ExisteCategoriaId} = require('../helpers/db-validators');

const { validarCampos,
        validarJWT,
        esAdminRole,
        tieneRol } = require('../middlewares/index');

const router = Router();

router.get('/', obtenerCategorias);

router.get('/:id',[
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(ExisteCategoriaId),
    validarCampos
], obtenerCategoria);

router.post('/',[
    validarJWT,
    check('nombre','el nombre de la categoria es obligatoria').not().isEmpty(),
    check('nombre').custom(siExisteCategoria),
    validarCampos
], crearCategoria);

router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(ExisteCategoriaId),
    check('nombre','el nombre de la categoria es obligatoria').not().isEmpty(),
    check('nombre').custom(siExisteCategoria),
    validarCampos
], actualizarCategoria );

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(ExisteCategoriaId),
    validarCampos
], borrarCategoria );

module.exports = router;