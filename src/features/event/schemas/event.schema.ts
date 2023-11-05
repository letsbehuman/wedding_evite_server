import Joi, { ObjectSchema } from 'joi';

const eventSchema: ObjectSchema = Joi.object().keys({
    title: Joi.string().optional().allow(null, ''),
    nameOne: Joi.string().required().messages({ 'string.empty': 'This field is required' }),
    nameTwo: Joi.string().required().messages({ 'string.empty': 'This field is required' }),
    date: Joi.string().required().messages({ 'string.empty': 'This field is required' }),
    time: Joi.string().required().messages({ 'string.empty': 'This field is required' }),
    contact: Joi.array().items(
        Joi.object().keys({
            id: Joi.number().optional().allow(null),
            title: Joi.string().optional().allow(null, ''),
            name: Joi.string().optional().allow(null, ''),
            phone: Joi.string().optional().allow(null, ''),
            inChargeOf: Joi.string().optional().allow(null, '')
        })
    ),
    locations: Joi.array().items(
        Joi.object().keys({
            id: Joi.number().optional().allow(null),
            title: Joi.string().optional().allow(null, ''),
            name: Joi.string().optional().allow(null, ''),
            image: Joi.string().optional().allow(null, ''),
            date: Joi.string().optional().allow(null, ''),
            time: Joi.string().optional().allow(null, ''),
            address: Joi.string().optional().allow(null, '')
        })
    ),
    message: Joi.string().optional().allow(null, ''),
    gifts: Joi.array().items(Joi.string().optional().allow(null, '')),
    dressCode: Joi.string().optional().allow(null, ''),
    childPolicy: Joi.boolean().optional().allow(null, ''),
    image: Joi.string().optional().allow(null, ''),
    menus: Joi.array().items(Joi.string().optional().allow(null, ''))
});

export { eventSchema };
