import Joi, { ObjectSchema } from 'joi';

const addFamilyGuestSchema: ObjectSchema = Joi.object().keys({
    guests: Joi.array().items(
        Joi.object().keys({
            name: Joi.string().required().min(3).messages({
                'string.base': 'name must be of type string',
                'string.empty': 'name is a required field'
            }),
            surname: Joi.string().optional().allow(null, '')
        })
    ),
    extraGuestPermission: Joi.boolean().required().default(false)
});

export { addFamilyGuestSchema };
