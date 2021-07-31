import Joi from 'joi';


const schemas = {
    filter: Joi.object().keys({
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        minCount: Joi.number().required(),
        maxCount: Joi.number().required()
    }).options({ abortEarly: false }),
}

export default schemas;