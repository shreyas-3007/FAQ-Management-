// Update FAQ with cache clearing and updating
const Faq = require('../models/faqModel');
const { autoTranslate } = require('../utils/translateText');
const { setCachedData, clearCache } = require('../config/redisClient');  // import caching methods

const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params; // Get FAQ ID from params
    const { question, answer } = req.body; // Updated data

    let faq = await Faq.findById(id);
    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ not found." });
    }

    // Update only if provided
    if (question) faq.question.text = question;
    if (answer) faq.answer.text = answer;

    // Automatically translate updated fields
    const translatedFAQ = await autoTranslate(faq);

    // Save the updated FAQ
    await translatedFAQ.save();

    // Clear cache before re-caching the updated FAQ
    await clearCache(`faq:${id}`);
    await setCachedData(`faq:${id}`, translatedFAQ);  // Cache the updated FAQ

    res.json({ success: true, message: "FAQ updated successfully.", data: translatedFAQ });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res.status(500).json({ success: false, message: "Error updating FAQ.", error: error.message });
  }
};

module.exports = updateFAQ;
