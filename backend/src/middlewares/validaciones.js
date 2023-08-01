// Importar Joi para validación de esquemas
const Joi = require('joi');

// Definir el esquema de validación para los datos del producto
const productoEsquema = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
        // Mensajes de error personalizados para cada validación
        'string.base': 'El título debe ser una cadena de texto',
        'string.empty': 'El título no debe estar vacío',
        'string.min': 'El título debe tener al menos 3 caracteres',
        'string.max': 'El título no debe tener más de 100 caracteres',
        'any.required': 'El título es un campo requerido',
    }),
    price: Joi.number().min(0).required().messages({
        'number.base': 'El precio debe ser un número',
        'number.empty': 'El precio no debe estar vacío',
        'number.min': 'El precio debe ser como mínimo $0',
        'any.required': 'El precio es un campo requerido',
    }),
    description: Joi.string().min(3).max(250).required().messages({
        'string.base': 'La descripción debe ser una cadena de texto',
        'string.empty': 'La descripción no debe estar vacía',
        'string.min': 'La descripción debe tener al menos 3 caracteres',
        'string.max': 'La descripción no debe tener más de 250 caracteres',
        'any.required': 'La descripción es un campo requerido',
    }),
    category: Joi.string().min(3).max(100).required().messages({
        'string.base': 'La categoría debe ser una cadena de texto',
        'string.empty': 'La categoría no debe estar vacía',
        'string.min': 'La categoría debe tener al menos 3 caracteres',
        'string.max': 'La categoría no debe tener más de 100 caracteres',
        'any.required': 'La categoría es un campo requerido',
    }),
    image: Joi.string().required().messages({
        'string.base': 'La imagen debe ser una cadena de texto',
        'string.empty': 'La imagen no debe estar vacía',
        'any.required': 'La imagen es un campo requerido',
    }),
});

// Middleware de validación para los datos del producto
const productoValidacion = (req, res, next) => {
    let payload = req.body;
    // Validar los datos del producto con el esquema definido
    let validacionDeProducto = productoEsquema.validate(payload, { abortEarly: false });

    // Si hay errores de validación, se envía una respuesta de error con los mensajes detallados
    if (validacionDeProducto.error) {
        const errores = validacionDeProducto.error.details.map((detalle) => {
            return {
                campo: detalle.context.key,
                mensaje: detalle.message,
            };
        });
        return res.status(400).json({ errores });
    }

    // Si los datos son válidos, pasar al siguiente middleware
    next();
};

// Definir el esquema de validación para el ID del producto
const idSchema = Joi.string().length(24).hex().required();

// Middleware para verificar que se ingrese un ID válido en la URL
const comprobarId = (req, res, next) => {
    const productId = req.params.id;

    // Validar que el ID cumpla con el esquema definido
    const { error } = idSchema.validate(productId);

    // Si hay un error de validación, se envía una respuesta de error con un mensaje personalizado
    if (error) {
        return res.status(400).json({ error: 'El ID es inválido, asegúrese de que tenga 24 caracteres hexadecimales' });
    }
    // Si el ID es válido, se pasa al siguiente middleware
    next();
};

// Exportar los middlewares para su uso en otros archivos
module.exports = { productoValidacion, comprobarId };
