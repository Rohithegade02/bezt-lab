'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateUser } from '@/app/api/user'
import { User } from '@/app/types/type'
import { useAppSelector } from '@/app/lib/hook'
import toast, { Toaster } from 'react-hot-toast'
import { schema } from '@/app/schema/user'

function Page() {
  const router = useRouter()
  const user = useAppSelector(state => state.user.selectedUser)

  const [initialUser, setInitialUser] = useState<User | null>(null) // Store initial user data

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  // Set the values in the form when the page loads
  useEffect(() => {
    if (user) {
      setValue('username', user.username)
      setValue('phone', user.phone)
      setInitialUser(user) // Save the initial user data for comparison
    }
  }, [user, setValue])

  //PATCH API
  const onSubmit = async (data: User) => {
    if (initialUser) {
      // Create an object with only updated fields
      const updatedData = Object.keys(data).reduce(
        (acc: Partial<User>, key: string) => {
          const typedKey = key as keyof User

          // Check if the field value has changed and filter out unchanged fields
          if (data[typedKey] !== initialUser[typedKey]) {
            if (data[typedKey] !== undefined) {
              // Ensure the value is not undefined
              acc[typedKey] = data[typedKey] as User[keyof User] // Safely assign the value to acc
            }
          }

          return acc
        },
        {} as Partial<User>,
      ) // Use Partial<User> for optional fields

      if (Object.keys(updatedData).length > 0) {
        // If there are updates, send a request to update the user data
        const res: Response | undefined = await updateUser(
          initialUser.id as number,
          updatedData as User, // Cast updatedData to User
        )
        if (res?.ok) {
          toast.success('Successfully Updated!')
          setTimeout(() => {
            router.push('/users')
          }, 2000)
        } else {
          toast.error('Internal Server Error')
        }
      }
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex lg:w-[30%] w-[70%] py-5 flex-col gap-5 bg-white items-center rounded-lg justify-center h-60'>
        <div>
          <h1 className='font-semibold text-2xl'>Edit User</h1>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-5'
          >
            <div className='flex flex-col'>
              <div className='flex justify-between'>
                <label>UserName</label>
                <input
                  className='border border-black rounded-md'
                  {...register('username')}
                />
              </div>
              <div>
                {errors.username && (
                  <p className='text-red-400 text-sm'>
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='flex gap-10'>
                <label>Phone</label>
                <input
                  className='border border-black rounded-md'
                  {...register('phone')}
                />
              </div>
              <div>
                {errors.phone && (
                  <p className='text-red-400 text-sm'>{errors.phone.message}</p>
                )}
              </div>
            </div>
            <div className='gap-5 flex items-end justify-end'>
              <button
                type='reset'
                className='py-2 px-4 bg-white border rounded-md border-gray-400 text-gray-700'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='py-2 px-4 bg-green-300 border rounded-md border-gray-400 text-gray-700'
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default Page
