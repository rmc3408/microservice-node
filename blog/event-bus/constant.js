const BASE_URL = 'http://localhost:'

const K8S_POSTS_URL = 'http://posts-srv:'
const K8S_COMMENTS_URL = 'http://comments-srv:'
const K8S_QUERY_URL = 'http://query-srv:'
const K8S_MODERATOR_URL = 'http://moderator-srv:'

const PORT_POSTS = 4001
const PORT_COMMENTS = 4002
const PORT_QUERY = 4003
const PORT_MODERATOR = 5001

const PORT_BUS = 4000

module.exports = {
  BASE_URL,
  PORT_POSTS,
  PORT_COMMENTS,
  PORT_QUERY,
  PORT_MODERATOR,
  K8S_COMMENTS_URL,
  K8S_QUERY_URL,
  K8S_MODERATOR_URL,
  PORT_BUS,
  K8S_POSTS_URL,
}
