const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    const styledStatus = comment.status === 'APPROVED' ? { color: 'green' } : { color: 'red' }
    return (
      <li key={comment.id}>
        <span style={styledStatus}>{comment.content}</span>
      </li>
    )
  })

  return <ul>{renderedComments}</ul>
}

export default CommentList
