'use client'

import React, { useEffect } from 'react'
import { redirect } from 'next/navigation'

function Login() {
    useEffect(()=>{
        const url = '/api/auth/login'
        redirect(url)
    },[])
  return (
    <div>
      logging in
    </div>
  )
}

export default Login
