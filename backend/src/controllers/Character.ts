import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Character from '../models/Character';

const createCharacter = (req: Request, res: Response, next: NextFunction) => {
    const { name, house } = req.body;

    const character = new Character({
        _id: new mongoose.Types.ObjectId(),
        name,
        house
    });

    return character
        .save()
        .then((character) => res.status(201).json({ character }))
        .catch((error) => res.status(500).json({ error }));
};

const readCharacter = (req: Request, res: Response, next: NextFunction) => {
    const characterId = req.params.characterId;

    return Character.findById(characterId)
        .populate('house')
        .select('-__v')
        .then((character) => (character ? res.status(200).json({ character }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Character.find()
        .populate('house')
        .select('-__v')
        .then((characters) => res.status(200).json({ characters }))
        .catch((error) => res.status(500).json({ error }));
};

const updateCharacter = (req: Request, res: Response, next: NextFunction) => {
    const characterId = req.params.characterId;

    return Character.findById(characterId)
        .then((character) => {
            if (character) {
                character.set(req.body);

                return character
                    .save()
                    .then((character) => res.status(201).json({ character }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteCharacter = (req: Request, res: Response, next: NextFunction) => {
    const characterId = req.params.characterId;

    return Character.findByIdAndDelete(characterId)
        .then((character) => (character ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createCharacter, readCharacter, readAll, updateCharacter, deleteCharacter };
