import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'
import { BASE_URL, K8S_INGRESS, PORT_QUERY } from './constant'

const PostList = () => {
  const [posts, setPosts] = useState({})

  const fetchPosts = async () => {
    // Monolithic
    //const res = await axios.get(BASE_URL + PORT_POSTS + '/posts')
    // Microservice local - Query
    //const res = await axios.get(BASE_URL + PORT_QUERY + '/posts')
    // Microservice Kubernetes
    const res = await axios.get(K8S_INGRESS + '/posts')
    setPosts(res.data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div className="card" style={{ width: '30%', marginBottom: '20px' }} key={post.id}>
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentCreate postId={post.id} />
          <CommentList postId={post.id} comments={post.comments} />
        </div>
      </div>
    )
  })

  return <div className="d-flex flex-row flex-wrap justify-content-between">{renderedPosts}</div>
}

export default PostList
