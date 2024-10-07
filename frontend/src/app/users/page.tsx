'use client'
import { PencilIcon, XMarkIcon } from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { deleteUser, getAllUser } from '../api/user'
import { Profile, User } from '../types/type'
import { useDispatch } from 'react-redux'
import {
  setSelectedUser,
  setSelectedProfileUser,
} from '../lib/features/user/userSlice'
import toast, { Toaster } from 'react-hot-toast'

export default function Page() {
  const dispatch = useDispatch()
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  const router = useRouter()
  const [users, setUsers] = useState<Array<User>>([])
  //get api
  const fetchUsers = useCallback(async () => {
    const response = await getAllUser()
    setUsers(response)
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const allUsers = useMemo(() => users, [users])
  const handleViewProfile = useCallback(
    (userProfile: Profile) => {
      dispatch(setSelectedProfileUser(userProfile))
      router.push(`/users/profile`)
    },
    [dispatch, router],
  )

  const handleCreateUser = useCallback(() => {
    router.push('/users/create')
  }, [router])
  const handleEditUser = useCallback(
    (user: User) => {
      dispatch(setSelectedUser(user)) // Set user in the global state
      router.push(`/users/edit`) // Navigate to the edit page
    },
    [dispatch, router],
  )

  return (
    <React.Fragment>
      <div className='flex gap-5 p-10 items-center'>
        <div>
          <p>Users</p>
        </div>
        <div>
          <button
            className='py-2 px-5 border-2 border-black rounded-md bg-blue-400 text-white'
            onClick={() => handleCreateUser()}
          >
            Create User
          </button>
        </div>
      </div>
      <div className='p-10 flex items-center justify-center rounded-lg'>
        <table className='w-[70%] table-auto border-collapse border border-gray-200 rounded-lg'>
          <thead className='rounded-lg'>
            <tr>
              <th className='border border-gray-300 text-white px-4 py-2'>
                Username
              </th>
              <th className='border border-gray-300 text-white px-4 py-2'>
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map(user => (
              <tr key={user.id}>
                <td className='border text-white border-gray-300 px-4 py-2'>
                  {user.username}
                </td>
                <td className='border text-white border-gray-300 px-4 py-2'>
                  {user.phone}
                </td>
                <td className='pl-4'>
                  <PencilIcon
                    height={20}
                    width={20}
                    onClick={() => handleEditUser(user)}
                    className=' text-white cursor-pointer'
                  />
                </td>
                <td>
                  <XMarkIcon
                    height={20}
                    width={20}
                    onClick={() => setShowDeleteModal(!showDeleteModal)}
                    className='text-white border-2 cursor-pointer border-white rounded-full'
                  />
                </td>

                <td>
                  <button
                    className='text-blue-400'
                    onClick={() => handleViewProfile(user)}
                  >
                    View Profile
                  </button>
                </td>
                {showDeleteModal && (
                  <div className='fixed inset-0 z-10 flex items-center justify-center'>
                    <div
                      className='absolute inset-0 bg-black opacity-20'
                      onClick={() => setShowDeleteModal(false)}
                    ></div>
                    {/* Modal */}
                    <div className='relative shadow-lg z-20'>
                      <DeleteModal
                        setShowDeleteModal={setShowDeleteModal}
                        userId={user.id}
                        fetchUsers={fetchUsers}
                      />
                    </div>{' '}
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

const DeleteModal = ({
  setShowDeleteModal,
  userId,
  fetchUsers,
}: {
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
  userId: number | undefined
  fetchUsers: () => Promise<void> // Function to refetch users
}) => {
  const deleteUserFunction = useCallback(
    async (userId: number) => {
      const res: Response | undefined = await deleteUser(userId)
      if (res?.ok) {
        toast.success('Deleted Successfully')
        await fetchUsers() // Refetch users after successful deletion

        setTimeout(() => {
          setShowDeleteModal(false)
        }, 2000)
      } else {
        toast.error('Internal Server Error')
        setTimeout(() => {
          setShowDeleteModal(false)
        }, 2000)
      }
    },
    [fetchUsers, setShowDeleteModal],
  )
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
        <button
          className='text-gray-500 border border-gray-500 bg-red-300 px-5 py-2 rounded-md'
          onClick={() => deleteUserFunction(userId)}
        >
          Yes
        </button>
      </div>
      <Toaster />
    </div>
  )
}
