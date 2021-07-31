import { Document } from "mongoose";

export interface IRecord extends Document {
	key: string,
	createdAt: Date,
	totalCount: number
}