import Joi, { ArraySchema } from 'joi';

const addFamilyGuestSchema: ArraySchema = Joi.array().items(
    Joi.object({
        guests: Joi.array()
            .items(
                Joi.object().keys({
                    firstName: Joi.string().required().min(3).messages({
                        'string.base': 'name must be of type string',
                        'string.empty': 'name is a required field'
                    }),
                    surname: Joi.string().optional().allow(null, ''),
                    isConfirmed: Joi.boolean().required().default(false)
                })
            )
            .required(),
        extraGuestPermission: Joi.boolean().required().default(false)
    })
);

export { addFamilyGuestSchema };
