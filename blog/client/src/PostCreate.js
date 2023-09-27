import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL, PORT_POSTS, K8S_INGRESS } from './constant'

const PostCreate = () => {
  const [title, setTitle] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()

    await axios.post(K8S_INGRESS + '/posts/create', {
      title,
    })

    setTitle('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default PostCreate
