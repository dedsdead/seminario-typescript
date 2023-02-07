import mongoose, { Document, Schema } from 'mongoose';

export interface IHouse {
    name: string;
    sigil: string;
}

export interface IHouseModel extends IHouse, Document {}

const HouseSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        sigil: {
            type: String,
            required: true
        }
    },
    { versionKey: false }
);

export default mongoose.model<IHouseModel>('House', HouseSchema);
