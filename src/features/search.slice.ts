import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InitialState as SearchInitialState } from '../consts/search'
import { RootState } from '../app/store'

const searchSlice = createSlice({
  name: 'search',
  initialState: SearchInitialState,
  reducers: {
    cleanSearch: () => {
      return SearchInitialState
    },
    updateSearchAttribute: (state, { payload }: PayloadAction<{ attribute: string; value: unknown }>) => {
      const { attribute, value } = payload
      return {
        ...state,
        [attribute]: value,
      }
    },
  },
})

export const selectNotifications = (state: RootState) => state.notifications

export const { cleanSearch, updateSearchAttribute } = searchSlice.actions
export default searchSlice.reducer
