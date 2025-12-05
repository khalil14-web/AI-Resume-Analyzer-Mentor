import mongoose, { Schema, Document } from "mongoose";

export interface ICV extends Document {
  filename: string;
  path: string;
  uploadedAt: Date;
  owner: mongoose.Types.ObjectId; // صاحب الملف
}

const cvSchema: Schema = new Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const cvModel = mongoose.model<ICV>("CV", cvSchema);

export default cvModel;
