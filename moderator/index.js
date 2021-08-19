const express = require('express');
const BodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(BodyParser.json());

app.post('/events', async (req, res) => {
    const event = req.body;
    const { type, data } = event;

    if (type === 'CommentsCreated') {
        const analyzedStatus = data.content.includes('orange') ? 'REJECTED' : 'APPROVED';
        const moderatorCreatedEvent = {
            type: 'CommentsModeratorCreated',
            data: {
                ...data,
                status: analyzedStatus,
            }
        };
        await axios.post('http://localhost:4005/events', moderatorCreatedEvent);
    }
    res.send({ status: 'OK' });
});

app.listen(4003, () => {
    console.log(`Listening MODERATOR at 4003`)
});