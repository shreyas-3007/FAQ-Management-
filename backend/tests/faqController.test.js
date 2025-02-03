const request = require('supertest');
const app = require('../index'); 

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

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('_id');

    faqId = res.body.data._id; // Save the FAQ ID for later use
  });

  // Create FAQ
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
  });

  // Fetch FAQs
  it('should fetch all FAQs in different languages', async () => {
    const languages = ['hi', 'mr', 'bn', 'en'];

    for (const lang of languages) {
      const res = await request(app)
        .get('/api/faqs')
        .query({ lang });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true); // Ensure the response is an array
    }
  });

  // Update FAQ
  it('should update an existing FAQ', async () => {
    const res = await request(app)
      .put(`/api/faq/${faqId}`)
      .send({
        question: 'What is Redis Cache?',
        answer: 'Redis is an in-memory data structure store used as a cache.',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data.question.text).toBe('What is Redis Cache?');
  });

  // Delete FAQ
  it('should delete an FAQ', async () => {
    const res = await request(app).delete(`/api/faq/${faqId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('FAQ deleted successfully.');
  });

 
});
