import React from 'react'

function Index({ currentUser }) {
  console.log('I am Client', currentUser)

  return currentUser ? <h1>You are signed in {currentUser.id}</h1> : <h2>You are not sign!</h2>
}

export default Index