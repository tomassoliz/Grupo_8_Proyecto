const { check, body } = require('express-validator');

module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio'),

    check('brand')
        .notEmpty().withMessage('La marca es requerida'),

    check('section')
        .notEmpty().withMessage('La sección es requerida'),

    check('price')
        .notEmpty().withMessage('Debes indicar el precio').bail()
        .isDecimal().withMessage('El precio debe ser un número entero'),

    check('description')
        .notEmpty().withMessage('La descripción es requerida').bail()
        .isLength({
            min: 10,
            max: 800
        }).withMessage('La descripción debe tener entre 10 y 500 caracteres'),

    body('images')
        .custom((value, { req }) => {
            if (req.files.image) {
                return true
            }
            return false
        }).withMessage('No subiste ninguna imagen')
]