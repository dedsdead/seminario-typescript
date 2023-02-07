import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import House from '../models/House';

const createHouse = (req: Request, res: Response, next: NextFunction) => {
    const { name, sigil } = req.body;

    const house = new House({
        _id: new mongoose.Types.ObjectId(),
        name,
        sigil
    });

    return house
        .save()
        .then((house) => res.status(201).json({ house }))
        .catch((error) => res.status(500).json({ error }));
};

const readHouse = (req: Request, res: Response, next: NextFunction) => {
    const houseId = req.params.houseId;

    return House.findById(houseId)
        .then((house) => (house ? res.status(200).json({ house }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return House.find()
        .then((houses) => res.status(200).json({ houses }))
        .catch((error) => res.status(500).json({ error }));
};

const updateHouse = (req: Request, res: Response, next: NextFunction) => {
    const houseId = req.params.houseId;

    return House.findById(houseId)
        .then((house) => {
            if (house) {
                house.set(req.body);

                return house
                    .save()
                    .then((house) => res.status(201).json({ house }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteHouse = (req: Request, res: Response, next: NextFunction) => {
    const houseId = req.params.houseId;

    return House.findByIdAndDelete(houseId)
        .then((house) => (house ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createHouse, readHouse, readAll, updateHouse, deleteHouse };
