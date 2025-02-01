const Faq = require("../models/faqModel");


const getFAQ = async (req, res) => {
  try {
    const lang = req.query.lang || 'en'; 

    const faqs = await Faq.find(); 

    const translatedFAQs = faqs.map(faq => {
      return {
        _id: faq._id,
        question: faq.question.translations[lang] || faq.question.text, 
        answer: faq.answer.translations[lang] || faq.answer.text, 
        createdAt: faq.createdAt
      };
    });

    res.status(200).json({ success: true, faqs: translatedFAQs });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ success: false, message: 'Error fetching FAQs', error: error.message });
  }
};

module.exports = getFAQ;
