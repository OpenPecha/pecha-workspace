'use client'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

function Page() {
    useEffect(()=>{
        const url = '/api/auth/logout'
        redirect(url)
    },[])
  return (
    <div>
      logging out
    </div>
  )
}

export default Page
