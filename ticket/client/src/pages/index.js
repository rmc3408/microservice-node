import React from 'react'
import Headers from '../layout/header'

function Index({ currentUser }) {
  return <>
    <Headers currentUser={currentUser} />
    {currentUser ? <h1>You are signed in {currentUser.id}</h1> : <h2>You are not sign!</h2>}
  </>
}

export default Index