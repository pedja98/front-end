import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { crmApi } from '../app/apis/crm.api'
import { FetchUserResponse } from '../types/user'
import { UpdateAttributePayload } from '../types/common'
import { InitialState as UserInitialState } from '../consts/user'

const userSlice = createSlice({
  name: 'user',
  initialState: UserInitialState,
  reducers: {
    updateUserAttribute: (state, { payload }: PayloadAction<UpdateAttributePayload>) => {
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

export const { updateUserAttribute } = userSlice.actions
export default userSlice.reducer
