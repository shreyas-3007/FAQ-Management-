import { toast } from "react-toastify";
import style from "../styles/FaqList.module.css";

function FaqList({ faqs, onDelete }) {
  return (
    <div className={style.faqList}>
      {faqs.length > 0 ? (
        faqs.map((faq) => (
          <div key={faq._id} className={style.faqItem}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
            <button
              className={style.faqItemButton}
              onClick={() => onDelete(faq._id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No FAQs available</p>
      )}
    </div>
  );
}

export default FaqList;
