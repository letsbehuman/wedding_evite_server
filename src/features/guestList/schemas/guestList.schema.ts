import Joi, { ObjectSchema } from 'joi';

const guestSchema: ObjectSchema = Joi.object().keys({
    name: Joi.string().required().min(3).messages({
        'string.base': 'name must be of type string',
        'string.empty': 'name is a required field'
    }),
    surname: Joi.string().optional().allow(null, ''),
    extraGuestPermission: Joi.boolean().required().default(false)
});

const extraGuestSchema: ObjectSchema = Joi.object().keys({
    name: Joi.string().required().min(3).messages({
        'string.base': 'name must be of type string',
        'string.empty': 'name is a required field'
    }),
    surname: Joi.string().required().min(3).messages({
        'string.base': 'surname must be of type string',
        'string.empty': 'surname is a required field'
    })
});
export { guestSchema, extraGuestSchema };
