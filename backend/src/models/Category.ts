import mongoose, { Document, Schema } from "mongoose";

export type CategoryType = Document & {
  name: string;
  description: string;
};

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
});

const Category = mongoose.model<CategoryType>("Category", CategorySchema);
export default Category;