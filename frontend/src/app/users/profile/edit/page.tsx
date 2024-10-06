'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateUser } from '@/app/api/user'
import { GenderEnum, User } from '@/app/types/type'
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
  console.log(userProfile)
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
    }
  }, [userProfile, setValue])

  // Handle form submission
  const onSubmit = async (data: User) => {
    const { id, ...userData } = data

    if (userProfile) {
      await updateProfileUser(userProfile.id, userData) // Update the user data
      router.push('/users') // Redirect to users list after updating
    }
  }

  return (
    <div className='flex w-full p-5 flex-col items-center justify-center h-screen'>
      <div>
        <h1 className='font-semibold text-2xl'>Edit Profile User</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          {/* Username */}
          <div className='flex flex-col'>
            <label>UserName</label>
            <input
              className='border border-black rounded-md'
              {...register('username')}
            />
            <div>{errors.username && <p>{errors.username.message}</p>}</div>
          </div>

          {/* Phone */}
          <div className='flex flex-col'>
            <label>Phone</label>
            <input
              className='border border-black rounded-md'
              {...register('phone')}
            />
            <div>{errors.phone && <p>{errors.phone.message}</p>}</div>
          </div>

          {/* Gender */}
          <div className='flex flex-col'>
            <label>Gender</label>
            <select
              className='border border-black rounded-md'
              {...register('gender')}
            >
              <option value=''>Select Gender</option>
              {Object.values(GenderEnum).map(gender => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            <div>{errors.gender && <p>{errors.gender.message}</p>}</div>
          </div>

          {/* Email */}
          <div className='flex flex-col'>
            <label>Email</label>
            <input
              className='border border-black rounded-md'
              type='email'
              {...register('email')}
            />
            <div>{errors.email && <p>{errors.email.message}</p>}</div>
          </div>

          {/* Address */}
          <div className='flex flex-col'>
            <label>Address</label>
            <input
              className='border border-black rounded-md'
              {...register('address')}
            />
            <div>{errors.address && <p>{errors.address.message}</p>}</div>
          </div>

          {/* Pincode */}
          <div className='flex flex-col'>
            <label>Pincode</label>
            <input
              className='border border-black rounded-md'
              {...register('pincode')}
            />
            <div>{errors.pincode && <p>{errors.pincode.message}</p>}</div>
          </div>

          {/* City */}
          <div className='flex flex-col'>
            <label>City</label>
            <input
              className='border border-black rounded-md'
              {...register('city')}
            />
            <div>{errors.city && <p>{errors.city.message}</p>}</div>
          </div>

          {/* State */}
          <div className='flex flex-col'>
            <label>State</label>
            <input
              className='border border-black rounded-md'
              {...register('state')}
            />
            <div>{errors.state && <p>{errors.state.message}</p>}</div>
          </div>

          {/* Country */}
          <div className='flex flex-col'>
            <label>Country</label>
            <input
              className='border border-black rounded-md'
              {...register('country')}
            />
            <div>{errors.country && <p>{errors.country.message}</p>}</div>
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
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page
