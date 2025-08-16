import React from 'react'
import { useParams } from 'react-router-dom'

// useParams is a React Router hook that lets you access dynamic parameters from the current URL.
// These parameters are defined using a ':' (colon) in your route path.

function User() {
  const {userid} = useParams()
  return (
    <div className='bg-gray-600 text-white text-3xl p-4'>User: {userid}</div>
  )
}

export default User