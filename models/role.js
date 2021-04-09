const {Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required:[true, 'El rol es obligatorio'],
    },

},
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = model('Role', RoleSchema);