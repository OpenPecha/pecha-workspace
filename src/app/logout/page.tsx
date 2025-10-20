'use client'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

function Page() {
    useEffect(()=>{
      setTimeout(()=>{
        window.location.href = '/api/auth/logout'
      },1000)
    },[])
  return (
    <div>
      logging out
    </div>
  )
}

export default Page
