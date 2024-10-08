'use client'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function Home() {
  const router = useRouter()
  const handleUser = useCallback(() => {
    router.push('/users')
  }, [router])
  return (
    <div className='flex justify-center items-center h-screen'>
      <button
        className='py-2 px-2 bg-blue-400 text-white rounded-md'
        onClick={handleUser}
      >
        Users Directory
      </button>
    </div>
  )
}
