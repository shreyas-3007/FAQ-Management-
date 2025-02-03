import { useState } from "react";
import { toast } from "react-toastify";
import { createFaq, updateFaq } from "../api/faq";
import style from "../styles/FaqForm.module.css";

function FaqForm({ onFaqAdded, faq = {} }) {
  const [question, setQuestion] = useState(faq.question || "");
  const [answer, setAnswer] = useState(faq.answer || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFaq({ question, answer });
      toast.success("FAQ created successfully");
      setQuestion("");
      setAnswer(" ");

      onFaqAdded();
    } catch (error) {
      toast.error("Failed to save FAQ");
    }
  };

  return (
    <form className={style.faqForm} onSubmit={handleSubmit}>
      <input
        className={style.faqFormInput}
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <textarea
        className={style.faqFormTextarea}
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <button className={style.faqFormButton} type="submit">
        Save FAQ
      </button>
    </form>
  );
}

export default FaqForm;
