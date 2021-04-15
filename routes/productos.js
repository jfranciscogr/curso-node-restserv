const {check} = require('express-validator');
const { Router } = require('express');

const { validarCampos,
    validarJWT,
    esAdminRole,
    tieneRol } = require('../middlewares/index');

const {ExisteCategoriaId, siExisteProducto, ExisteProductoId} = require('../helpers/db-validators');

const {obtenerProductos,
       obtenerProducto,
       crearPreoducto,
       actualizarPreoducto,
       borrarProducto} =require('../controllers/productos')

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id',[
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(ExisteProductoId),
    validarCampos
], obtenerProducto);

router.post('/',[
    validarJWT,
    check('nombre','el nombre del producto es obligatoria').not().isEmpty(),
    check('categoria','No es un ID Valido').isMongoId(),
    check('categoria').custom(ExisteCategoriaId),
    check('nombre').custom(siExisteProducto),
    validarCampos
], crearPreoducto);

router.put('/:id',[
    validarJWT,
    check('nombre','el nombre del producto es obligatoria').not().isEmpty(),
    check('nombre').custom(siExisteProducto),
    check('categoria','No es un ID Valido').isMongoId(),
    check('categoria').custom(ExisteCategoriaId),
    validarCampos
], actualizarPreoducto );

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(ExisteProductoId),
    validarCampos
], borrarProducto );

module.exports = router;