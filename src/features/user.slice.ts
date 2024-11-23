import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { crmApi } from '../app/apis/crm.api'
import { FetchUserResponse, UpdateAttributePayload } from '../types/user'
import { InitialState as UserInitialState } from '../consts/user'

const userSlice = createSlice({
  name: 'user',
  initialState: UserInitialState,
  reducers: {
    setUserAttribute: (state, { payload }: PayloadAction<UpdateAttributePayload>) => {
      const { attribute, value } = payload
      return {
        ...state,
        [attribute]: value,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      crmApi.endpoints.getUserByUsername.matchFulfilled,
      (state, { payload }: PayloadAction<FetchUserResponse>) => {
        return { ...state, ...payload }
      },
    )
  },
})

export const { setUserAttribute } = userSlice.actions
export default userSlice.reducer
