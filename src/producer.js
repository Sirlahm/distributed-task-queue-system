import express from 'express';
import taskQueue from './queue.js';

const app = express();
app.use(express.json());

app.post('/enqueue', async (req, res) => {
    try {
        const job = await taskQueue.add('processTask', req.body);
        res.status(200).json({ message: 'Task enqueued', jobId: job.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => console.log('Producer running on port 3000'));
}

export default app;