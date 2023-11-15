import Joi, { ObjectSchema } from 'joi';

const signinSchema: ObjectSchema = Joi.object().keys({
    email: Joi.string().required().email().messages({
        'string.base': 'Email must be of type string',
        'string.email': 'Email must be valid',
        'string.empty': 'Email is a required field'
    }),
    password: Joi.string().required().min(4).max(8).messages({
        'string.base': 'Password must be of type string',
        'string.min': 'Password must be between 4-8 characters',
        'string.max': 'Password must be between 4-8 characters',
        'string.empty': 'Password is a required field'
    })
});
export { signinSchema };
