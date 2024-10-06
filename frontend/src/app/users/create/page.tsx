'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { createUser } from '@/app/api/user'
import { User } from '@/app/types/type'

// type FormData = {
//   username: string
//   phone: string
// }
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data: User) => {
    await createUser(data) // create a new user
  }
  return (
    <div className='flex  w-full p-5 flex-col items-center justify-center h-screen '>
      <div>
        <h1 className='font-semibold text-2xl'>Users Create / Edit</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          <div className='flex flex-col '>
            <div className='flex justify-between'>
              <label className=''>UserName </label>
              <input
                //   onFocus={errors.username?.message?.length < 1}
                className='border border-black  rounded-md'
                {...register('username', { required: 'Username is required' })}
              />
            </div>
            <div> {errors.username && <p>{errors.username.message}</p>}</div>{' '}
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
            <div>{errors.phone && <p>{errors.phone.message}</p>}</div>
          </div>
          <div className='w-60 flex justify-between'>
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
          </div>{' '}
        </form>
      </div>
    </div>
  )
}

export default Page
