import mongoose from "mongoose";

const schema = new mongoose.Schema({
  question: String,
  answer: String,
  snippets: Array,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("QAHistory", schema);