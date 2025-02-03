import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FaqForm from "../components/FaqForm";
import FaqList from "../components/FaqList";
import { getFaqs, deleteFaq } from "../api/faq";
import style from "../styles/Home.module.css";

function Home() {
  const [faqs, setFaqs] = useState([]);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    fetchFaqs(language);
  }, [language]);

  const fetchFaqs = async (lang) => {
    try {
      const data = await getFaqs(lang); // Pass the selected language as a query param
      setFaqs(data.data);
    } catch (error) {
      toast.error("Failed to load FAQs");
    }
  };

  const handleDelete = async (_id) => {
    try {
      await deleteFaq(_id);
      setFaqs(faqs.filter((faq) => faq._id !== _id));
      toast.success("FAQ deleted successfully");
    } catch (error) {
      toast.error("Failed to delete FAQ");
    }
  };

  return (
    <div className={style.home}>
      <h1>Admin Panel</h1>
      <h1>BharatFD FAQs Management</h1>

      <FaqForm onFaqAdded={() => fetchFaqs(language)} />

      <div className={style.languageButtons}>
        <button onClick={() => setLanguage("en")}>English</button>
        <button onClick={() => setLanguage("hi")}>Hindi</button>
        <button onClick={() => setLanguage("mr")}>Marathi</button>
        <button onClick={() => setLanguage("bn")}>Bengali</button>
      </div>
      <FaqList faqs={faqs} onDelete={handleDelete} />
    </div>
  );
}

export default Home;
