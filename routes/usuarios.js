
const {check} = require('express-validator');
const { Router } = require('express');
const { validarCampos } =require('../middlewares/validar-campos');
const { esRoleValido,
        siExisteEmail,
        ExisteUsuarioId} = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');



const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(ExisteUsuarioId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut );

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser mas de 6 letras').isLength({min: 6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(siExisteEmail),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost );

router.delete('/:id',[
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(ExisteUsuarioId),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;