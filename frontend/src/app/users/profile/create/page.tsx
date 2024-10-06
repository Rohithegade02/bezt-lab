'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { GenderEnum, Profile } from '@/app/types/type'
import { createProfileUser } from '@/app/api/profile'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup
  .object({
    username: yup.string().min(4),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10)
      .max(10),
    gender: yup
      .mixed()
      .oneOf(Object.values(GenderEnum).map(e => e as GenderEnum)),
    email: yup.string().email(),
    address: yup.string().min(10),
    pincode: yup.string().min(6).max(6),
    city: yup.string(),
    state: yup.string(),
    country: yup.string(),
  })
  .required()

function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data: Profile) => {
    console.log('hello')
    console.log(data)
    await createProfileUser(data) // create a new user
  }
  return (
    <div className='flex w-full p-5 flex-col items-center justify-center h-screen'>
      <div>
        <h1 className='font-semibold text-2xl'>Users Create / Edit</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          <div className='flex flex-col'>
            <div className='flex justify-between'>
              <label>Username</label>
              <input
                className='border border-black rounded-md'
                {...register('username', { required: 'Username is required' })}
              />
            </div>
            <div>{errors.username && <p>{errors.username.message}</p>}</div>
          </div>

          <div className='flex flex-col'>
            <div className='flex justify-between'>
              <label>Phone</label>
              <input
                className='border border-black rounded-md'
                {...register('phone', {
                  required: 'Phone number is required',
                  minLength: 10,
                })}
              />
            </div>
            <div>{errors.phone && <p>{errors.phone.message}</p>}</div>
          </div>

          <div className='flex flex-col'>
            <div className='flex justify-between'>
              <label>Email</label>
              <input
                className='border border-black rounded-md'
                {...register('email', { required: 'Email is required' })}
              />
            </div>
            <div>{errors.email && <p>{errors.email.message}</p>}</div>
          </div>

          <div className='flex flex-col'>
            <div className='flex justify-between'>
              <label>Gender</label>
              <select
                className='border border-black rounded-md'
                {...register('gender', { required: 'Gender is required' })}
              >
                <option value=''>Select Gender</option>
                <option value={GenderEnum.male}>Male</option>
                <option value={GenderEnum.female}>Female</option>
                <option value={GenderEnum.other}>Other</option>
              </select>
            </div>
            <div>{errors.gender && <p>{errors.gender.message}</p>}</div>
          </div>

          <div className='flex flex-col'>
            <div className='flex justify-between'>
              <label>Address</label>
              <input
                className='border border-black rounded-md'
                {...register('address', { required: 'Address is required' })}
              />
            </div>
            <div>{errors.address && <p>{errors.address.message}</p>}</div>
          </div>

          <div className='flex flex-col'>
            <div className='flex justify-between'>
              <label>Pincode</label>
              <input
                className='border border-black rounded-md'
                {...register('pincode', { required: 'Pincode is required' })}
              />
            </div>
            <div>{errors.pincode && <p>{errors.pincode.message}</p>}</div>
          </div>

          <div className='flex flex-col'>
            <div className='flex justify-between'>
              <label>City</label>
              <input
                className='border border-black rounded-md'
                {...register('city', { required: 'City is required' })}
              />
            </div>
            <div>{errors.city && <p>{errors.city.message}</p>}</div>
          </div>

          <div className='flex flex-col'>
            <div className='flex justify-between'>
              <label>State</label>
              <input
                className='border border-black rounded-md'
                {...register('state', { required: 'State is required' })}
              />
            </div>
            <div>{errors.state && <p>{errors.state.message}</p>}</div>
          </div>

          <div className='flex flex-col'>
            <div className='flex justify-between'>
              <label>Country</label>
              <input
                className='border border-black rounded-md'
                {...register('country', { required: 'Country is required' })}
              />
            </div>
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
