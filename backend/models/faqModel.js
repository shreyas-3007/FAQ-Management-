const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    translations: {
      question_hi: { type: String },
      question_bn: { type: String },
      question_mr: { type: String },
    },
    answer_translations: {
      answer_hi: { type: String },
      answer_bn: { type: String },
      answer_mr: { type: String },
    },
  },
  { timestamps: true }
);

const Faq = mongoose.model("Faq", faqSchema);

module.exports = Faq;
