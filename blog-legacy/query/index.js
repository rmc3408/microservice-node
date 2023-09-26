const express = require('express');
const BodyParser = require('body-parser');
const axios = require('axios');
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

    handleEvents(type, data);
    
    //console.log(posts);
    res.send({});
});

const handleEvents = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }
    if (type === 'CommentsCreated') {
        const { id, content , postId, status } = data;
        posts[postId].comments.push({ id, content, status });
    }
    if (type === 'CommentsUpdated') {
        const { id, content , postId, status } = data;
        const UpdatedComment = posts[postId].comments.find((com) => {
            return com.id === id;
        });
        UpdatedComment.status = status;
        UpdatedComment.content = content;
    }
};

app.listen(port, async () => {
    console.log(`Listening QUERY at ${port}`);

    const total = await axios.get('http://localhost:4005/events');

    for (let ev of total.data) {
        console.log('processing all QUERY events: ', ev.type);
        handleEvents(ev.type, ev.data);
    }
});