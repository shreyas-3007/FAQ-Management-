
const translate = require('google-translate-api');
const Faq = require('../models/faqModel');
const { autoTranslate } = require('../utils/translateText');

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
        translatedFAQ = await autoTranslate(faq);

        

      

        // Save the updated FAQ
        await translatedFAQ.save();

        res.json({ success: true, message: "FAQ updated successfully.",data:faq });
    } catch (error) {
        console.error("Error updating FAQ:", error);
        res.status(500).json({ success: false, message: "Error updating FAQ.", error: error.message });
    }
};

module.exports = updateFAQ;
