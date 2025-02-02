const Faq = require("../models/faqModel");
const { getCachedData, setCachedData } = require("../utils/cache"); // import caching methods

const getFAQ = async (req, res) => {
  try {
    const lang = req.query.lang || "en";
    const cacheKey = `faqs_${lang}`; // Language-specific cache key
    const cachedFAQs = await getCachedData(cacheKey);

    if (cachedFAQs) {
      return res.status(200).json({ success: true, faqs: cachedFAQs });
    }

    // If not cached, fetch from DB
    const faqs = await Faq.find();
    const translatedFAQs = faqs.map((faq) => ({
      _id: faq._id,
      question: faq.question.translations?.[lang] || faq.question.text,
      answer: faq.answer.translations?.[lang] || faq.answer.text,
      createdAt: faq.createdAt,
    }));

    // Cache the language-specific FAQs
    await setCachedData(cacheKey, translatedFAQs);

    res.status(200).json({ success: true, faqs: translatedFAQs });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching FAQs",
      error: error.message,
    });
  }
};

module.exports = getFAQ;
