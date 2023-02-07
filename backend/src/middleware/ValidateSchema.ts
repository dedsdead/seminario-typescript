import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';
import Logging from '../library/Logging';
import { IHouse } from '../models/House';
import { ICharacter } from '../models/Character';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    house: {
        create: Joi.object<IHouse>({
            name: Joi.string().required(),
            sigil: Joi.string().required()
        }),
        update: Joi.object<IHouse>({
            name: Joi.string().required(),
            sigil: Joi.string().required()
        })
    },
    character: {
        create: Joi.object<ICharacter>({
            name: Joi.string().required(),
            house: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required()
        }),
        update: Joi.object<ICharacter>({
            name: Joi.string().required(),
            house: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required()
        })
    }
};
