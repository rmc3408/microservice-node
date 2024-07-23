import React, { useState } from 'react'
import { useRouter } from 'next/router'
import useRequest from '../../hooks/useRequest'

function SignUp() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: { email, password },
    onSucess: (_data) => router.push('/')
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    await doRequest()
  }

  return (
    <form onSubmit={handleSubmit} >
      <div className='mx-5 py-4'>
        <h1>Sign Up</h1>
        <div className='form-group'>
          <label>Email</label>
          <input className='form-control' onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} />
        </div>
        {errors}
        <button type='submit' className='btn btn-primary'>Send</button>
      </div>
    </form>
  )
}

export default SignUp