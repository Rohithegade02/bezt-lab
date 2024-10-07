'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { GenderEnum } from '@/app/types/type'
import { createProfileUser } from '@/app/api/profile'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { profileSchema } from '@/app/schema/profile'

function Page() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(profileSchema) })

  //POST API
  const onSubmit = async (data: {
    username: string
    phone: string
    gender: GenderEnum
    email: string
    address: string
    pincode: string
    city: string
    state: string
    country: string
  }) => {
    const res: Response | undefined = await createProfileUser(data)
    if (res?.ok) {
      toast.success('Successfully created!')
      setTimeout(() => {
        router.push('/users')
      }, 2000)
    } else {
      toast.error('Internal Server Error')
    }
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex gap-5 lg:w-[30%] w-[90%] bg-white p-8 flex-col  rounded-lg  '>
        <div>
          <h1 className='font-semibold text-2xl'>Users Create</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          <div className='flex flex-col'>
            <div className='flex w-[80%]'>
              <div className='basis-[40%]'>
                <label>Username:</label>
              </div>
              <div className='basis-[100%]'>
                <input
                  className='w-full border border-black rounded-md'
                  {...register('username', {
                    required: 'Username is required',
                  })}
                />
              </div>
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
            <div className='flex w-[80%]'>
              <div className='basis-[40%]'>
                <label>Phone:</label>
              </div>
              <div className='basis-[100%]'>
                <input
                  className='w-full border border-black rounded-md'
                  {...register('phone', {
                    required: 'Phone number is required',
                    minLength: {
                      value: 10,
                      message: 'Phone number must be at least 10 digits',
                    },
                  })}
                />
              </div>
            </div>
            <div>
              {errors.phone && (
                <p className='text-red-400 text-sm'>{errors.phone.message}</p>
              )}
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex w-[80%]'>
              <div className='basis-[40%]'>
                <label>Email:</label>
              </div>
              <div className='basis-[100%]'>
                <input
                  className='w-full border border-black rounded-md'
                  {...register('email', {
                    required: 'Email is required',
                  })}
                />
              </div>
            </div>
            <div>
              {errors.email && (
                <p className='text-red-400 text-sm'>{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex w-[80%]'>
              <div className='basis-[40%]'>
                <label>Gender:</label>
              </div>
              <div className='basis-[100%]'>
                <select
                  className='w-full border border-black rounded-md'
                  {...register('gender', { required: 'Gender is required' })}
                >
                  <option value=''>Select Gender</option>
                  <option value='MALE'>Male</option>
                  <option value='FEMALE'>Female</option>
                  <option value='OTHER'>Other</option>
                </select>
              </div>
            </div>
            <div>
              {errors.gender && (
                <p className='text-red-400 text-sm'>{errors.gender.message}</p>
              )}
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex w-[80%]'>
              <div className='basis-[40%]'>
                <label>Address:</label>
              </div>
              <div className='basis-[100%]'>
                <input
                  className='w-full border border-black rounded-md'
                  {...register('address', { required: 'Address is required' })}
                />
              </div>
            </div>
            <div>
              {errors.address && (
                <p className='text-red-400 text-sm'>{errors.address.message}</p>
              )}
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex w-[80%]'>
              <div className='basis-[40%]'>
                <label>Pincode:</label>
              </div>
              <div className='basis-[100%]'>
                <input
                  className='w-full border border-black rounded-md'
                  {...register('pincode', { required: 'Pincode is required' })}
                />
              </div>
            </div>
            <div>
              {errors.pincode && (
                <p className='text-red-400 text-sm'>{errors.pincode.message}</p>
              )}
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex w-[80%]'>
              <div className='basis-[40%]'>
                <label>City:</label>
              </div>
              <div className='basis-[100%]'>
                <input
                  className='w-full border border-black rounded-md'
                  {...register('city', { required: 'City is required' })}
                />
              </div>
            </div>
            <div>
              {errors.city && (
                <p className='text-red-400 text-sm'>{errors.city.message}</p>
              )}
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex w-[80%]'>
              <div className='basis-[40%]'>
                <label>State:</label>
              </div>
              <div className='basis-[100%]'>
                <input
                  className='w-full border border-black rounded-md'
                  {...register('state', { required: 'State is required' })}
                />
              </div>
            </div>
            <div>
              {errors.state && (
                <p className='text-red-400 text-sm'>{errors.state.message}</p>
              )}
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex w-[80%]'>
              <div className='basis-[40%]'>
                <label>Country:</label>
              </div>
              <div className='basis-[100%]'>
                <input
                  className='w-full border border-black rounded-md'
                  {...register('country', { required: 'Country is required' })}
                />
              </div>
            </div>
            <div>
              {errors.country && (
                <p className='text-red-400 text-sm'>{errors.country.message}</p>
              )}
            </div>
          </div>
          <div className=' flex items-end justify-evenly px-8 '>
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
              Save{' '}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  )
}

export default Page
