'use client'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

function Page() {
    useEffect(()=>{
      setTimeout(()=>{
        const url = '/api/auth/logout'
        redirect(url)
      },1000)
    },[])
  return (
    <div>
      logging out
    </div>
  )
}

export default Page
