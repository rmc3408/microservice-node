import React, { useState } from 'react'
import axios from 'axios'

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/signup', { email, password })
      console.log(res.data)
    } catch (error) {
      console.log(error.response.data.errors)
      setErrors(error.response.data.errors)
    }
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
        {errors.length > 0 && <ul className='alert alert-danger mt-3 px-4'>
          {errors.map((er) => <li key={er.message}>{er.message}</li>)}
        </ul>}
        <button type='submit' className='btn btn-primary'>Send</button>
      </div>
    </form>
  )
}

export default SignUp