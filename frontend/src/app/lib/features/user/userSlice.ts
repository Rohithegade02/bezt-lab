import { Profile, User } from '@/app/types/type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  selectedUser: User | null
  selectedProfileUser: Profile | null
}

const initialState: UserState = {
  selectedUser: null,
  selectedProfileUser: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<User>) {
      state.selectedUser = action.payload
    },
    setSelectedProfileUser(state, action: PayloadAction<Profile>) {
      state.selectedProfileUser = action.payload
    },
    clearUser(state) {
      state.selectedUser = null
    },
  },
})

export const { setSelectedProfileUser, setSelectedUser, clearUser } =
  userSlice.actions

export default userSlice.reducer
