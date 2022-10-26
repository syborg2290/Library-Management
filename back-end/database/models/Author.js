import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
  {
    first_name: { type: String, required: true, min: 3 },
    last_name: { type: String, required: true, min: 3 },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

export const AuthorModel = mongoose.model("author", AuthorSchema);
