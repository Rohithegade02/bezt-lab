import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type User = {
  id: number
  username: string
  phone: string
} | null

interface UserState {
  selectedUser: User
}

const initialState: UserState = {
  selectedUser: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<User>) {
      state.selectedUser = action.payload
    },
    clearUser(state) {
      state.selectedUser = null
    },
  },
})

export const { setSelectedUser, clearUser } = userSlice.actions

export default userSlice.reducer
