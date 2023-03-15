import Joi, { ObjectSchema } from 'joi';

const guestSchema: ObjectSchema = Joi.object().keys({
    name: Joi.string().required().min(3).messages({
        'string.base': 'name must be of type string',
        'string.empty': 'name is a required field'
    }),
    surname: Joi.string().optional().allow(null, ''),
    extraGuestPermission: Joi.boolean().required().default(false)
});

const confimationGuest: ObjectSchema = Joi.object().keys({
    guests: Joi.array().items({
        name: Joi.string().required().min(3).messages({
            'string.base': 'name must be of type string',
            'string.empty': 'name is a required field'
        }),
        surname: Joi.string().optional().allow(null, ''),
        status: Joi.boolean().required(),
        menu: Joi.string().required(),
        _id: Joi.string().optional()
    })
});

export { guestSchema, confimationGuest };
