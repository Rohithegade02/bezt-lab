//[id]/page.tsx
'use client'
import { PencilIcon, XMarkIcon } from '@heroicons/react/16/solid'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

function UserProfile() {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const path = usePathname()
  const id = path.split('/')[2]
  console.log(id)

  return (
    <div className='max-w-xl mx-auto my-auto shadow-lg rounded-lg border p-10 border-gray-300'>
      {/* Header Section */}
      <div className='flex gap-5 items-center mb-4'>
        <h1 className='text-lg font-semibold'>Profile</h1>
        <div className='space-x-2'>
          {/* <h1>Profile</h1> */}
          <button className='py-1 px-3 bg-blue-400 text-white rounded-md'>
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
      {showDeleteModal && (
        <div className='fixed inset-0 z-10 flex items-center justify-center'>
          <div
            className='absolute inset-0 bg-black opacity-50'
            onClick={() => setShowDeleteModal(false)}
          ></div>
          {/* Modal */}
          <div className='relative shadow-lg z-20'>
            <DeleteModal setShowDeleteModal={setShowDeleteModal} />
          </div>{' '}
        </div>
      )}
      {/* Profile Details */}
      <div className='space-y-2'>
        <div className='flex '>
          <span className='flex flex-[1%] font-semibold'>Username:</span>
          <span className='flex-1'>Ravi Kumar</span>
        </div>
        <div className='bg-gray-300 h-px w-full rounded-lg' />
        <div className='flex '>
          <span className='flex  flex-[1%] font-semibold'>Email:</span>
          <span className='flex-1'>ravi.kumar@test.com</span>
        </div>
        <div className='bg-gray-300 h-px w-full rounded-lg' />

        <div className='flex justify-between'>
          <span className='font-semibold flex  flex-[1%]'>Gender:</span>
          <span className='flex-1'>Male</span>
        </div>
        <div className='bg-gray-300 h-px w-full rounded-lg' />

        <div className='flex justify-between'>
          <span className='font-semibold flex  flex-[1%]'>Address:</span>
          <span className='flex-1'>Flat 203, AVG Apartment</span>
        </div>
        <div className='bg-gray-300 h-px w-full rounded-lg' />

        <div className='flex justify-between'>
          <span className='font-semibold flex  flex-[1%]'>Pincode:</span>
          <span className='flex-1'>562164</span>
        </div>
        <div className='bg-gray-300 h-px w-full rounded-lg' />

        <div className='flex justify-between'>
          <span className='font-semibold flex  flex-[1%]'>City:</span>
          <span className='flex-1'>Bangalore</span>
        </div>
        <div className='bg-gray-300 h-px w-full rounded-lg' />

        <div className='flex justify-between'>
          <span className='font-semibold flex  flex-[1%]'>State:</span>
          <span className='flex-1'>Karnataka</span>
        </div>
        <div className='bg-gray-300 h-px w-full rounded-lg' />

        <div className='flex justify-between'>
          <span className='font-semibold flex  flex-[1%]'>Country:</span>
          <span className='flex-1'>India</span>
        </div>
      </div>
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
        <h1>Are you sure want to delete?</h1>
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
