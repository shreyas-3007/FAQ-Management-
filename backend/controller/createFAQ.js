// Create FAQ with caching
const Faq = require('../models/faqModel');
const { autoTranslate } = require('../utils/translateText');
const { setCachedData, getCachedData, clearCache } = require('../config/redisClient');  // import caching methods

const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const faq = new Faq({
      question: {
        text: question,
        translations: {},
      },
      answer: {
        text: answer,
        translations: {},
      },
    });

    await autoTranslate(faq);
    await faq.save();

    // Set cache after FAQ creation and translation
    await setCachedData(`faq:${faq._id}`, faq);  // Caching the newly created FAQ

    res.status(201).json({
      success: true,
      data: faq,
      message: 'FAQ created and translations added successfully!',
    });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating FAQ.',
      error: error.message,
    });
  }
};

module.exports = createFAQ;
