const Faq = require("../models/faqModel");
const { getCachedData, setCachedData } = require("../utils/cache"); // import caching methods

const getFAQ = async (req, res) => {
  try {

    
    const lang = req.query.lang || "en";
    const cacheKey = `faqs_${lang}`; // Language-specific cache key
    const cachedFAQs = await getCachedData(cacheKey);
    console.log(cachedFAQs)

    // if (cachedFAQs) {
    //   return res.status(200).json({ success: true, data: cachedFAQs });
    // }

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

    res.status(200).json({ success: true, data: translatedFAQs });
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


// const Faq = require("../models/faqModel");
// const { getCachedData, setCachedData } = require("../utils/cache");

// const getFAQ = async (req, res) => {
//   try {
//     const lang = req.query.lang || "en"; // Default to English if no lang query is provided
//     const cacheKey = `faqs_${lang}`; // Language-specific cache key
//     const cachedFAQs = await getCachedData(cacheKey);

//     if (cachedFAQs) {
//       return res.status(200).json({ success: true, data: cachedFAQs });
//     }

//     // If not cached, fetch from DB
//     const faqs = await Faq.find();
//     const translatedFAQs = faqs.map((faq) => ({
//       _id: faq._id,
//       question: faq.question.translations?.[lang] || faq.question.text,
//       answer: faq.answer.translations?.[lang] || faq.answer.text,
//       createdAt: faq.createdAt,
//     }));

//     // Cache the language-specific FAQs
//     await setCachedData(cacheKey, translatedFAQs);

//     res.status(200).json({ success: true, data: translatedFAQs });
//   } catch (error) {
//     console.error("Error fetching FAQs:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching FAQs",
//       error: error.message,
//     });
//   }
// };

// module.exports = getFAQ;

// const Faq = require("../models/faqModel");
// const { getCachedData, setCachedData } = require("../utils/cache"); // import caching methods

// const getFAQ = async (req, res) => {
//   try {
//     const lang = req.query.lang || "en"; // Default to English if no lang query is provided
//     const cacheKey = `faqs_${lang}`; // Language-specific cache key
//     const cachedFAQs = await getCachedData(cacheKey);

//     // Check if FAQs are cached for the requested language
//     if (cachedFAQs) {
//       // Ensure the cached data is an array before sending the response
//       return res.status(200).json({ success: true, data: Array.isArray(cachedFAQs) ? cachedFAQs : [] });
//     }

//     // If not cached, fetch from DB
//     const faqs = await Faq.find();
//     const translatedFAQs = faqs.map((faq) => ({
//       _id: faq._id,
//       question: faq.question.translations?.[lang] || faq.question.text,
//       answer: faq.answer.translations?.[lang] || faq.answer.text,
//       createdAt: faq.createdAt,
//     }));

//     // Cache the language-specific FAQs (ensure it's stored as an array)
//     await setCachedData(cacheKey, translatedFAQs);

//     res.status(200).json({ success: true, data: translatedFAQs });
//   } catch (error) {
//     console.error("Error fetching FAQs:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching FAQs",
//       error: error.message,
//     });
//   }
// };

// module.exports = getFAQ;

// const getFAQ = async (req, res) => {
//   try {
//     const lang = req.query.lang || "en";
//     const cacheKey = `faqs_${lang}`; // Language-specific cache key
//     const cachedFAQs = await getCachedData(cacheKey);

//     // Ensure we always return an array (even if there's only one FAQ in cache)
//     if (cachedFAQs && Array.isArray(cachedFAQs)) {
//       return res.status(200).json({ success: true, data: cachedFAQs });
//     }

//     // If not cached, fetch from DB
//     const faqs = await Faq.find();
//     const translatedFAQs = faqs.map((faq) => ({
//       _id: faq._id,
//       question: faq.question.translations?.[lang] || faq.question.text,
//       answer: faq.answer.translations?.[lang] || faq.answer.text,
//       createdAt: faq.createdAt,
//     }));

//     // Cache the language-specific FAQs
//     await setCachedData(cacheKey, translatedFAQs);

//     res.status(200).json({ success: true, data: translatedFAQs });
//   } catch (error) {
//     console.error("Error fetching FAQs:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching FAQs",
//       error: error.message,
//     });
//   }
// };
