const express = require('express');
const BodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(BodyParser.json());
app.use(cors());
const port = 4000;

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id,
        title,
    };
    await axios.post('http://bus-service-cluster:4005/events', {
        type: 'PostCreated',
        data: { id, title }
    });

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    const event = req.body;
    console.log('POSTS event is', event.type);
    res.send({});
});


app.listen(port, () => {
    console.log(`Listening POSTS version 0.0.3 at ${port}`)
});