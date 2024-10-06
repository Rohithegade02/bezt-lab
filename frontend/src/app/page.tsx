'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <div className='flex justify-center items-center h-screen'>
      <button
        className='py-2 px-2 bg-blue-400 text-white rounded-md'
        onClick={() => router.push('/users')}
      >
        Users Directory
      </button>
    </div>
  )
}
