'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createUser } from '@/app/api/user'
import { User } from '@/app/types/type'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { schema } from '@/app/schema/user'

function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })
  const router = useRouter()
  //POST API
  const onSubmit = async (data: User) => {
    const res: Response | undefined = await createUser(data)
    if (res?.ok) {
      toast.success('Successfully created!')
      setTimeout(() => {
        router.replace('/users')
      }, 2000)
    } else {
      toast.error('Internal Server Error')
    }
  }
  return (
    <div className='flex justify-center items-center h-screen '>
      <div className='flex lg:w-[30%] w-[70%] py-5 flex-col gap-5 bg-white items-center rounded-lg justify-center '>
        <div>
          <h1 className='font-semibold text-2xl'>Users Create </h1>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-5'
          >
            <div className='flex flex-col '>
              <div className='flex justify-between'>
                <label className=''>UserName </label>
                <input
                  //   onFocus={errors.username?.message?.length < 1}
                  className='border border-black  rounded-md'
                  {...register('username', {
                    required: 'Username is required',
                  })}
                />
              </div>
              <div>
                {' '}
                {errors.username && (
                  <p className='text-red-400 text-sm'>
                    {errors.username.message}
                  </p>
                )}
              </div>{' '}
            </div>
            <div className='flex flex-col'>
              <div className='flex gap-10'>
                <label>Phone</label>
                <input
                  className='border border-black  rounded-md'
                  {...register('phone', {
                    required: 'Phone number is required',
                    minLength: 10,
                  })}
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
