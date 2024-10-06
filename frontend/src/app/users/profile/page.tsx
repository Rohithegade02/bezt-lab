'use client'
import { PencilIcon, XMarkIcon } from '@heroicons/react/16/solid'
import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/app/lib/hook'

function UserProfile() {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const router = useRouter()

  // Fetch selected profile user from Redux store
  const userProfile = useAppSelector(state => state.user.selectedProfileUser)

  const handleCreateUserProfile = useCallback(() => {
    router.push(`/users/profile/create`)
  }, [router])

  if (!userProfile) {
    return <p>No profile selected.</p>
  }

  return (
    <div className='max-w-xl mx-auto my-auto shadow-lg rounded-lg border p-10 border-gray-300'>
      {/* Header Section */}
      <div className='flex gap-5 items-center mb-4'>
        <h1 className='text-lg font-semibold'>Profile</h1>
        <div className='space-x-2'>
          <button
            className='py-1 px-3 bg-blue-400 text-white rounded-md'
            onClick={() => handleCreateUserProfile()}
          >
            Create Profile
          </button>
          <button className='text-gray-500'>
            <PencilIcon width={20} height={20} />
          </button>
          <button
            className='text-gray-500'
            onClick={() => setShowDeleteModal(!showDeleteModal)}
          >
            <XMarkIcon width={20} height={20} />
          </button>
        </div>
      </div>

      {/* Profile Details */}
      <div className='space-y-8'>
        <div className='flex'>
          <span className='flex-1 font-semibold'>Username:</span>
          <span className='flex-1'>{userProfile.username}</span>
        </div>
        <div className='flex'>
          <span className='flex-1 font-semibold'>Email:</span>
          <span className='flex-1'>{userProfile.email}</span>
        </div>
        {/* Add other fields like gender, address, etc. */}
      </div>

      {showDeleteModal && (
        <div className='fixed inset-0 z-10 flex items-center justify-center'>
          <div
            className='absolute inset-0 bg-black opacity-50'
            onClick={() => setShowDeleteModal(false)}
          ></div>
          <div className='relative shadow-lg z-20'>
            <DeleteModal setShowDeleteModal={setShowDeleteModal} />
          </div>
        </div>
      )}
    </div>
  )
}

const DeleteModal = ({
  setShowDeleteModal,
}: {
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <div className='flex flex-col w-96 h-40 items-center justify-center gap-2 bg-yellow-200 rounded-2xl border-2 border-gray-400'>
      <div>
        <h1>Are you sure you want to delete?</h1>
      </div>
      <div className='flex justify-between items-center w-48'>
        <button
          className='text-gray-500 border border-gray-500 bg-white px-5 py-2 rounded-md'
          onClick={() => setShowDeleteModal(false)}
        >
          No
        </button>
        <button className='text-gray-500 border border-gray-500 bg-red-300 px-5 py-2 rounded-md'>
          Yes
        </button>
      </div>
    </div>
  )
}

export default UserProfile
