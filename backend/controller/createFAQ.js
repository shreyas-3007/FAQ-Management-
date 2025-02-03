
const Faq = require('../models/faqModel');
const { autoTranslate } = require('../utils/translateText');
const { setCachedData} = require('../utils/cache');  
const { text } = require('express');

const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    

    const faq = new Faq({
      question: {
        text: question,
        translations: {
          en:question,
        },
      },
      answer: {
        text: answer,
        translations: {
          en:answer,
        },
      },
    });

    await autoTranslate(faq);
    await faq.save();

    // Set cache after FAQ creation and translation
    await setCachedData(`faq:${faq._id}`, faq);  

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


