import summaryApi from "../comman";

// fetch all FAQs
export const getFaqs = async (language = "en") => {
  try {
    const response = await fetch(`${summaryApi.GetFaqs.url}?lang=${language}`, {
      method: summaryApi.GetFaqs.method,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch FAQs");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// create a new FAQ
export const createFaq = async (faq) => {
  try {
    const response = await fetch(summaryApi.CreateFaq.url, {
      method: summaryApi.CreateFaq.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(faq),
    });

    if (!response.ok) {
      throw new Error("Failed to create FAQ");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// update an existing FAQ

export const updateFaq = async (_id, faq) => {
  try {
    const response = await fetch(`${summaryApi.UpdateFaq.url}/${_id}`, {
      method: summaryApi.updateFaq.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(faq),
    });

    if (!response.ok) {
      throw new Error("Failed to update FAQ");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// delete an FAQ
export const deleteFaq = async (_id) => {
  try {
    const response = await fetch(`${summaryApi.DeleteFaq.url}/${_id}`, {
      method: summaryApi.DeleteFaq.method,
    });

    if (!response.ok) {
      throw new Error("Failed to delete FAQ");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
