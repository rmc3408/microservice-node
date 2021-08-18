const express = require('express');
const BodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(BodyParser.json());
app.use(cors());
const port = 4001;

const commentsByPost = {};

app.get('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    res.send(commentsByPost[postId] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    const id = randomBytes(4).toString('hex');
    const { content } = req.body;

    //get existing or new array of comments.
    const commentsArr = commentsByPost[postId] || [];

    commentsArr.push({
        id,
        content,
    });

    //save array of comments in the postID property of memory variable object JSON.
    commentsByPost[postId] = commentsArr;
    res.status(201).send(commentsByPost[postId]);
});

app.listen(port, () => {
    console.log(`Listening COMMENTS at ${port}`)
});