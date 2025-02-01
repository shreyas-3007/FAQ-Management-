
const Faq = require('../models/faqModel');

const deleteFAQ = async (req, res) => {
    try {
        const { id } = req.params; // Get FAQ ID from params

        const faq = await Faq.findByIdAndDelete(id);
        if (!faq) {
            return res.status(404).json({ success: false, message: "FAQ not found." });
        }

        res.json({ success: true, message: "FAQ deleted successfully." });
    } catch (error) {
        console.error("Error deleting FAQ:", error);
        res.status(500).json({ success: false, message: "Error deleting FAQ.", error: error.message });
    }
};

module.exports = deleteFAQ;
