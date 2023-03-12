import Joi, { ObjectSchema } from 'joi';

const eventSchema: ObjectSchema = Joi.object().keys({
    title: Joi.string().optional().allow(null, ''),
    nameOne: Joi.string().required().messages({ 'string.empty': 'This field is required' }),
    nameTwo: Joi.string().required().messages({ 'string.empty': 'This field is required' }),
    date: Joi.string().required().messages({ 'string.empty': 'This field is required' }),
    time: Joi.string().required().messages({ 'string.empty': 'This field is required' }),
    contactOne: Joi.string().optional().allow(null, ''),
    contactTwo: Joi.string().optional().allow(null, ''),
    contactThree: Joi.string().optional().allow(null, ''),
    locationOne: Joi.string().required().messages({ 'string.empty': 'This field is required' }),
    locationTwo: Joi.string().optional().allow(null, ''),
    locationThree: Joi.string().optional().allow(null, ''),
    message: Joi.string().optional().allow(null, '')
});

export { eventSchema };
