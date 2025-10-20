'use client'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

function page() {
    useEffect(()=>{
        redirect('/api/auth/logout')
    },[])
  return (
    <div>
      logging out
    </div>
  )
}

export default page
