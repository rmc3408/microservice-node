const express = require('express');
const BodyParser = require('body-parser');
const cors = require('cors');
const port = 4002;

const posts = {};

const app = express();
app.use(BodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }
    if (type === 'CommentsCreated') {
        const { id, content , postId } = data;
        posts[postId].comments.push({ id, content });
    }
    console.log(posts);
    res.send({});
});

app.listen(port, () => {
    console.log(`Listening POSTS at ${port}`)
});