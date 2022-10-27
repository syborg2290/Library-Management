import mongoose from "mongoose";

// define a schema
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    name: { type: String, required: true },
    isbn: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          var re = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
          return !v || !v.trim().length || re.test(v);
        },
        message: "ISBN number is invalid!",
      },
    },
    author: { type: mongoose.Types.ObjectId, ref: "author", required: true },
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

// Compile model from schema
export const BookModel = mongoose.model("book", BookSchema);
