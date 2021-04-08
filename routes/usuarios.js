const { Router } = require('express');
const usuarioController = require('../controllers/usuarios')

const router= Router();

router.get('/', usuarioController.getUsuarios);
router.put('/:id', usuarioController.putUsuarios);
router.post('/',usuarioController.postUsuario);
router.delete('/:id',usuarioController.deleteUsuario);


module.exports= router;