import { createSlice } from '@reduxjs/toolkit'
import { InitialState as CommonInitialState } from '../consts/common'

const commonSlice = createSlice({
  name: 'confirm',
  initialState: CommonInitialState,
  reducers: {
    confirmEntityIsDeleted: (state) => {
      return { ...state, entityIsDeleted: true }
    },
    cleanCommonState: () => {
      return { ...CommonInitialState }
    },
  },
})

export const { confirmEntityIsDeleted, cleanCommonState } = commonSlice.actions
export default commonSlice.reducer
