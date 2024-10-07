'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { GenderEnum, Profile, User } from '@/app/types/type'
import { useAppSelector } from '@/app/lib/hook'
import { updateProfileUser } from '@/app/api/profile'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup
  .object({
    username: yup.string().min(4).required('Username is required'),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10)
      .max(10)
      .required('Phone number is required'),
    gender: yup
      .mixed()
      .oneOf(Object.values(GenderEnum).map(e => e as GenderEnum))
      .required('Gender is required'),
    email: yup.string().email().required('Email is required'),
    address: yup.string().min(10).required('Address is required'),
    pincode: yup.string().min(6).max(6).required('Pincode is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required'),
  })
  .required()

function Page() {
  const router = useRouter()
  const userProfile = useAppSelector(state => state.user.selectedProfileUser)
  const [initialUser, setInitialUser] = useState<Profile | null>(null) // Store initial user data

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  // Set the values in the form when the page loads
  useEffect(() => {
    if (userProfile) {
      setValue('username', userProfile.username)
      setValue('phone', userProfile.phone)
      setValue('gender', userProfile.profiles[0].gender)
      setValue('email', userProfile.profiles[0].email)
      setValue('address', userProfile.profiles[0].address)
      setValue('pincode', userProfile.profiles[0].pincode)
      setValue('city', userProfile.profiles[0].city)
      setValue('state', userProfile.profiles[0].state)
      setValue('country', userProfile.profiles[0].country)
      setInitialUser(userProfile) // Save the initial user data for comparison
      console.log(initialUser)
    }
  }, [userProfile, setValue])

  // Handle form submission
  const onSubmit = async (data: Profile) => {
    if (!initialUser) return

    // Compare new data with initial data and extract only changed fields
    const updatedData: Partial<Profile> = Object.keys(data).reduce(
      (acc, key) => {
        if (data[key as keyof Profile] !== initialUser[key as keyof Profile]) {
          acc[key as keyof Profile] = data[key as keyof Profile]
        }
        return acc
      },
      {} as Partial<Profile>,
    )

    // Only send PATCH request if there are updated fields
    if (Object.keys(updatedData).length > 0) {
      try {
        await updateProfileUser(initialUser.id, updatedData) // PATCH request with updated fields
        router.push('/users') // Redirect after successful update
      } catch (error) {
        console.error('Failed to update user profile:', error)
      }
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex gap-5 lg:w-[30%] w-[90%] bg-white p-8 flex-col  rounded-lg '>
        <div>
          <h1 className='font-semibold text-2xl'>Edit Profile User</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          {/* Username */}
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

          {/* Phone */}
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
          {/* Email */}
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
          {/* Gender */}
          <div className='flex flex-col'>
            <div className='flex w-[80%]'>
              <div className='basis-[40%]'>
                <label>Gender:</label>
              </div>
              <div className='basis-[100%]'>
                <select
                  className='border w-full border-black rounded-md'
                  {...register('gender', { required: 'Gender is required' })}
                >
                  <option value=''>Select Gender</option>
                  {Object.values(GenderEnum).map(gender => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>{errors.gender && <p>{errors.gender.message}</p>}</div>
          </div>

          {/* Address */}
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

          {/* Pincode */}
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

          {/* City */}
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

          {/* Country */}
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page
