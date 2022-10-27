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
          //Validate ISBN in model
          var re =
            /^(?:ISBN(?:-10)?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$)[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;
          return !v || !v.trim().length || re.test(v);
        },
        message: "ISBN number is invalid!",
      },
      unique: true,
    },
    author: { type: mongoose.Types.ObjectId, ref: "author", required: true }, //Create relationship
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
