import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  parent?: mongoose.Types.ObjectId | null;
  subcategories: mongoose.Types.ObjectId[];
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  subcategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
});

export default mongoose.model<ICategory>('Category', categorySchema);