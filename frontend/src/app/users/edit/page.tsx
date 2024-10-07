'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateUser } from '@/app/api/user'
import { User } from '@/app/types/type'
import { useAppSelector } from '@/app/lib/hook'
import toast, { Toaster } from 'react-hot-toast'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

// Yup schema validation
const schema = yup
  .object({
    username: yup.string().required().min(4),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10)
      .max(10),
  })
  .required()

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

  // Handle form submission
  const onSubmit = async (data: User) => {
    const { id, profiles, ...userData } = data

    if (initialUser) {
      // Create an object with only updated fields
      const updatedData = Object.keys(userData).reduce((acc, key) => {
        if (userData[key as keyof User] !== initialUser[key as keyof User]) {
          acc[key as keyof User] = userData[key as keyof User]
        }
        return acc
      }, {} as Partial<User>)

      if (Object.keys(updatedData).length > 0) {
        // If there are updates, send a request to update the user data
        const res: Response | undefined = await updateUser(
          initialUser.id,
          updatedData,
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
                Submit
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
