import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";
import { UserType } from "./User";

export type RoleType = Document & {
  name: string;
  description: string;
  users: PopulatedDoc<UserType & Document>[];
};

const RoleSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  user: { type: Types.ObjectId, ref: "User" },
});

const Role = mongoose.model<RoleType>("Role", RoleSchema);
export default Role;
