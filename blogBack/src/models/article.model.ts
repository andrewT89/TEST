import mongoose, { Schema } from "mongoose";

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: {
    type: Date,
    default: Date.now()
},
});

export default mongoose.model("Article", ArticleSchema);
