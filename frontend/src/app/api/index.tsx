const BASE_URL = 'http://localhost:3001'

//To create a new user api
export const createUser = async (data: { username: string; phone: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
// to get all user api
export const getAllUser = async () => {
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
///delete a user
export const deleteUser = async (userId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

export const updateUser = async (
  userId: number,
  data: { username: string; phone: string },
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
