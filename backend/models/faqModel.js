const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: {
    text: { type: String, required: true },
    translations: {
      en: { type: String },
      hi: { type: String },
      bn: { type: String },
      mr: { type: String },
    },
  },
  answer: {
    text: { type: String, required: true },
    translations: {
      en: { type: String },
      hi: { type: String },
      bn: { type: String },
      mr: { type: String },
    },
  },
  },
  { timestamps: true }
);

const Faq = mongoose.model("Faq", faqSchema);

module.exports = Faq;
