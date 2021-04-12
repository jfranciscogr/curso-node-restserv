const {check} = require('express-validator');
const { Router } = require('express');
const { validarCampos } =require('../middlewares/validar-campos');

const { login } = require('../controllers/auth');

const router = Router();

router.post('/login',[
    check('correo','El correo no es valido').isEmail(),
    check('password','la contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

module.exports = router;