import mongoose, { Document, Schema, Types } from "mongoose";

export type TokenType = Document & {
  token: string;
  user: Types.ObjectId;
  expired_at: Date;
};

const TokenSchema: Schema = new Schema(
  {
    token: { type: String, required: true, trim: true },
    user: { type: Types.ObjectId, ref: "User" },
    expired_at: { type: Date, required: true, trim: true },
  },
  { timestamps: true }
);

const Token = mongoose.model<TokenType>("Token", TokenSchema);
export default Token;
