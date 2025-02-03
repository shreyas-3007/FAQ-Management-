const Faq = require('../models/faqModel');
const { autoTranslate } = require('../utils/translateText');
const { setCachedData } = require('../utils/cache');

const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Create FAQ entry with only English text
    const faq = new Faq({
      question: {
        text: question,
        translations: { en: question },
      },
      answer: {
        text: answer,
        translations: { en: answer },
      },
    });

    await faq.save();

    // Set cache immediately to show the data instantly on browser
    await setCachedData(`faq:${faq._id}`, faq);

    // Respond to client immediately
    res.status(201).json({
      success: true,
      data: faq,
      message: 'FAQ created successfully! Translations will be added soon.',
    });

    //translated asynchronously
    autoTranslate(faq)
      .then(async (translatedFaq) => {
        await Faq.findByIdAndUpdate(faq._id, translatedFaq);
        await setCachedData(`faq:${faq._id}`, translatedFaq); // Update cache
      })
      .catch((error) => console.error('Error translating FAQ:', error));

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
