import request from 'supertest';
import app from '../src/producer';

describe('Producer API', () => {
    it('should enqueue a job', async () => {
        const res = await request(app).post('/enqueue').send({ task: 'test' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('jobId');
    });
});