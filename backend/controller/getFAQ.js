// Get FAQ with caching
const Faq = require("../models/faqModel");
const { getCachedData, setCachedData } = require('../config/redisClient');  // import caching methods

const getFAQ = async (req, res) => {
  try {
    const lang = req.query.lang || 'en'; 
    const cachedFAQs = await getCachedData('faqs');  // Check if all FAQs are cached

    if (cachedFAQs) {
      // If cache exists, send the cached data
      const translatedFAQs = cachedFAQs.map(faq => {
        return {
          _id: faq._id,
          question: faq.question.translations[lang] || faq.question.text, 
          answer: faq.answer.translations[lang] || faq.answer.text, 
          createdAt: faq.createdAt
        };
      });
      return res.status(200).json({ success: true, faqs: translatedFAQs });
    }

    // If not cached, fetch from DB and set cache
    const faqs = await Faq.find(); 
    const translatedFAQs = faqs.map(faq => {
      return {
        _id: faq._id,
        question: faq.question.translations[lang] || faq.question.text, 
        answer: faq.answer.translations[lang] || faq.answer.text, 
        createdAt: faq.createdAt
      };
    });

    // Cache the FAQs
    await setCachedData('faqs', translatedFAQs);

    res.status(200).json({ success: true, faqs: translatedFAQs });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ success: false, message: 'Error fetching FAQs', error: error.message });
  }
};

module.exports = getFAQ;
