import { Profile, User } from '../types/type'

const BASE_URL = 'http://localhost:3001'

//To create a new user profile api
export const createProfileUser = async (data: Profile) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response
  } catch (error) {
    console.error('Error:', error)
  }
}
// to get all profile user api
export const getAllProfileUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}
// delete a profile user api
export const deleteProfileUser = async (userId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    console.error('Error:', error)
  }
}
// update a profile user api
export const updateProfileUser = async (
  userId: number,
  data: User & Profile,
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/profile/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response
  } catch (error) {
    console.error('Error:', error)
  }
}
