const request = require('supertest');
const app = require('../index'); // Assuming your Express app is in index.js

describe('FAQ API Tests', () => {
  let faqId; // Store FAQ ID to be used in update and delete tests

  // Create FAQ before running tests
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/faq')
      .send({
        question: 'What is Redis?',
        answer: 'Redis is an open-source in-memory data structure store.',
      });
    faqId = res.body.data._id; // Save the FAQ ID for later use
  });

  // Test: Create FAQ
  it('should create a new FAQ', async () => {
    const res = await request(app)
      .post('/api/faq')
      .send({
        question: 'What is Redis?',
        answer: 'Redis is an open-source in-memory data structure store.',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.message).toBe('FAQ created and translations added successfully!');
  });

  // Test: Fetch FAQs for different languages
  it('should fetch all FAQs in different languages', async () => {
    const languages = ['hi', 'mr', 'bn'];
  
    for (const lang of languages) {
      const res = await request(app)
        .get('/api/faq')
        .query({lang});
  
    
  
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.faqs).toBeInstanceOf(Array);
     
    }
  });
  

  // Test: Update FAQ
  it('should update an existing FAQ', async () => {
    const res = await request(app)
      .put(`/api/faq/${faqId}`)
      .send({
        question: 'What is Redis Cache?',
        answer: 'Redis is an in-memory data structure store used as a cache.',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('FAQ updated successfully.');
  });

  // Test: Delete FAQ
  it('should delete an FAQ', async () => {
    const res = await request(app)
      .delete(`/api/faq/${faqId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('FAQ deleted successfully.');
  });
});
