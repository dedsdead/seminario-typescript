import mongoose, { Document, Schema } from 'mongoose';

export interface ICharacter {
    name: string;
    house: string;
}

export interface ICharacterModel extends ICharacter, Document {}

const CharacterSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        house: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'House'
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ICharacterModel>('Character', CharacterSchema);
