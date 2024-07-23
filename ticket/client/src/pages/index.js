import buildClient from '../hooks/buildClient'
import React from 'react'

function Index({ currentUser }) {
  console.log('I am Client')

  return currentUser ? <h1>You are signed in {currentUser.id}</h1> : <h2>You are not sign!</h2>
}

export async function getServerSideProps(context) {
  // Server Side 
  console.log('I am Server')
  try {
    const { data } = await buildClient(context).get('/api/users/current')
    return { props: { currentUser: data } }
  } catch (error) {
    console.log(error.response.data)
    return { props: { currentUser: null } }
  }
}

export default Index