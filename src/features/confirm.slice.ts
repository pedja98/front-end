import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InitialState as ConfirmInitialState } from '../consts/confirm'
import { RootState } from '../app/store'
import { ConfirmState } from '../types/confirm'

const confirmSlice = createSlice({
  name: 'confirm',
  initialState: ConfirmInitialState,
  reducers: {
    showConfirm: (state, action: PayloadAction<ConfirmState>) => {
      return { ...state, ...action.payload, open: true }
    },
    hideConfirm: () => {
      return { ...ConfirmInitialState }
    },
  },
})

export const selectConfirm = (state: RootState) => state.confirm

export const { showConfirm, hideConfirm } = confirmSlice.actions
export default confirmSlice.reducer