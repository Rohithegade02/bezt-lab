'use client'
import { PencilIcon, XMarkIcon } from '@heroicons/react/16/solid'
import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/app/lib/hook'
import { deleteProfileUser } from '@/app/api/profile'
import toast, { Toaster } from 'react-hot-toast'

function UserProfile() {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const router = useRouter()
  // Fetch selected profile user from Redux store
  const userProfile = useAppSelector(state => state.user.selectedProfileUser)

  const handleCreateUserProfile = useCallback(() => {
    router.push(`/users/profile/create`)
  }, [router])

  const handleEditProfile = useCallback(() => {
    router.push(`/users/profile/edit`)
  }, [router])
  if (userProfile?.profiles?.length === 0) {
    return (
      <p className='text-white flex h-screen  items-center justify-center'>
        Profile details are not available for this record.
      </p>
    )
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='lg:w-[30%] w-[90%]   bg-white shadow-lg rounded-lg border p-8 border-gray-300'>
        <div className='flex gap-5 items-center mb-4'>
          <h1 className='text-xl font-semibold '>Profile</h1>
          <div className='space-x-2 flex items-center'>
            <button
              className='py-1 px-3 bg-blue-400 text-gray-700  border-2 border-gray-500 rounded-md'
              onClick={() => handleCreateUserProfile()}
            >
              Create Profile
            </button>
            <button className='text-gray-500'>
              <PencilIcon
                width={20}
                height={20}
                className='mx-2 cursor-pointer'
                onClick={handleEditProfile}
              />
            </button>
            <button
              className='text-gray-500'
              onClick={() => setShowDeleteModal(!showDeleteModal)}
            >
              <XMarkIcon
                width={20}
                height={20}
                className=' border-2 cursor-pointer b border-gray-500 rounded-full'
              />
            </button>
          </div>
        </div>
        <div className='space-y-8'>
          <div className='flex flex-1'>
            <span className='basis-[30%]  font-semibold'>Username:</span>
            <span className='flex-grow '>{userProfile.username}</span>
          </div>
          <div className='flex flex-1'>
            <span className='basis-[30%] font-semibold'>Email:</span>
            <span className='flex-grow'>{userProfile.profiles[0].email}</span>
          </div>

          <div className='flex'>
            <span className='basis-[30%]  font-semibold'>Gender:</span>
            <span className='flex-grow '>
              {userProfile.profiles[0].gender &&
              userProfile.profiles[0].gender === 'MALE'
                ? 'Male'
                : userProfile.profiles[0].gender === 'FEMALE'
                ? 'Female'
                : 'Other'}
            </span>
          </div>
          <div className='flex'>
            <span className='basis-[30%]  font-semibold'>Address:</span>
            <span className='flex-grow '>
              {userProfile.profiles[0].address}
            </span>
          </div>
          <div className='flex'>
            <span className='basis-[30%]  font-semibold'>Pincode:</span>
            <span className='flex-grow '>
              {userProfile.profiles[0].pincode}
            </span>
          </div>
          <div className='flex'>
            <span className='basis-[30%]  font-semibold'>City:</span>
            <span className='flex-grow '>{userProfile.profiles[0].city}</span>
          </div>
          <div className='flex'>
            <span className='basis-[30%]  font-semibold'>State:</span>
            <span className='flex-grow '>{userProfile.profiles[0].state}</span>
          </div>
          <div className='flex'>
            <span className='basis-[30%] font-semibold'>Country:</span>
            <span className='flex-grow '>
              {userProfile.profiles[0].country}
            </span>
          </div>
        </div>

        {showDeleteModal && (
          <div className='fixed inset-0 z-10 flex items-center justify-center'>
            <div
              className='absolute inset-0 bg-black opacity-50'
              onClick={() => setShowDeleteModal(false)}
            ></div>
            <div className='relative shadow-lg z-20'>
              <DeleteModal
                setShowDeleteModal={setShowDeleteModal}
                userProfileId={userProfile.id}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const DeleteModal = ({
  setShowDeleteModal,
  userProfileId,
}: {
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
  userProfileId: number
}) => {
  const router = useRouter()
  //DELETE API
  const deleteUserFunction = useCallback(
    async (userProfileId: number) => {
      const res: Response | undefined = await deleteProfileUser(userProfileId)
      if (res?.ok) {
        toast.success('Deleted Successfully')
        setTimeout(() => {
          router.push('/users')
        }, 2000)
      } else {
        toast.error('Internal Server Error')
        setTimeout(() => {
          setShowDeleteModal(false)
        }, 2000)
      }
    },
    [router, setShowDeleteModal],
  )
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
        <button
          className='text-gray-500 border border-gray-500 bg-red-300 px-5 py-2 rounded-md'
          onClick={() => deleteUserFunction(userProfileId)}
        >
          Yes
        </button>
      </div>
      <Toaster />
    </div>
  )
}

export default UserProfile
