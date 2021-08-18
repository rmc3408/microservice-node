const express = require('express');
const BodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(BodyParser.json());
const port = 4000;

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id,
        title,
    };

    res.status(201).send(posts[id]);
});

app.listen(port, () => {
    console.log(`Listening POSTS at ${port}`)
});