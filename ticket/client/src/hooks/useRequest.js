import React, { useState } from 'react'
import axios from 'axios'

function useRequest({ url, method, body, onSucess }) {
  const [ errors, setErrors] = useState(null)

  const doRequest = async () => {
    setErrors(null)
    
    try {
      const res = await axios[method](url, body)
      onSucess(res.data)
    } catch (error) {
      setErrors(
      <ul className='alert alert-danger mt-3 px-4'>
        {error.response?.data?.errors?.map((er) => <li key={er.message}>{er.message}</li>)}
      </ul>)
    }
  }

  return {
    doRequest, errors
  }
}

export default useRequest