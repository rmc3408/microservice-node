import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL, PORT_COMMENTS } from './constant'

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()

    await axios.post(BASE_URL + PORT_COMMENTS + '/posts/' + postId + '/comments', {
      content,
    })

    setContent('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input value={content} onChange={(e) => setContent(e.target.value)} className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default CommentCreate
