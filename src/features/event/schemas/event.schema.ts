import Joi, { ObjectSchema } from 'joi';

const eventSchema: ObjectSchema = Joi.object().keys({
    title: Joi.string().optional().allow(null, ''),
    nameOne: Joi.string().required().messages({ 'string.empty': 'This field is required' }),
    nameTwo: Joi.string().required().messages({ 'string.empty': 'This field is required' }),
    date: Joi.string().required().messages({ 'string.empty': 'This field is required' }),
    time: Joi.string().required().messages({ 'string.empty': 'This field is required' }),
    contactOne: Joi.object().optional().allow(null, ''),
    contactTwo: Joi.object().optional().allow(null, ''),
    contactThree: Joi.object().optional().allow(null, ''),
    locationOne: Joi.object().required().messages({ 'object.empty': 'This field is required' }),
    locationTwo: Joi.object().optional().allow(null, ''),
    locationThree: Joi.object().optional().allow(null, ''),
    message: Joi.string().optional().allow(null, '')
});

export { eventSchema };
