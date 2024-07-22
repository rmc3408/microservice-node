const express = require('express');
const BodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(BodyParser.json());

const events = [];

app.post('/events', async (req, res) => {
    const event = req.body;

    events.push(event);

    await axios.post('http://posts-service-cluster:4000/events', event);
    // await axios.post('http://localhost:4001/events', event);
    // await axios.post('http://localhost:4002/events', event);
    // await axios.post('http://localhost:4003/events', event);

    res.send({ status: 'OKie' });
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log(`Listening EVENTS version 0.0.2 at 4005`)
});