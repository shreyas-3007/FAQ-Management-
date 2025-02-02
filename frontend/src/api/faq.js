import summaryApi from "../comman";

// Function to fetch all FAQs
export const getFaqs = async (language = "en") => { // Default to English
  try {
    const response = await fetch(`${summaryApi.GetFaqs.url}?lang=${language}`, {
      method: summaryApi.GetFaqs.method,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch FAQs");
    }

    const data = await response.json();
    console.log(data); // Debugging: Check API response

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// Function to create a new FAQ
export const createFaq = async (faq) => {
  try {
    const response = await fetch(summaryApi.CreateFaq.url, {
      method: summaryApi.CreateFaq.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(faq),
    });

    if (!response.ok) {
      throw new Error('Failed to create FAQ');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to update an existing FAQ
// Function to update an existing FAQ
export const updateFaq = async (_id, faq) => {  // Changed `id` to `_id`
  try {
    const response = await fetch(`${summaryApi.UpdateFaq.url}/${_id}`, { // Use _id
      method: summaryApi.updateFaq.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(faq),
    });

    if (!response.ok) {
      throw new Error('Failed to update FAQ');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to delete an FAQ
export const deleteFaq = async (_id) => {  // Changed `id` to `_id`
  try {
    const response = await fetch(`${summaryApi.DeleteFaq.url}/${_id}`, {  // Use _id
      method: summaryApi.DeleteFaq.method,
    });

    if (!response.ok) {
      throw new Error('Failed to delete FAQ');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
