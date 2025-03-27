import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InitialState as SearchInitialState } from '../consts/search'

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

export const { cleanSearch, updateSearchAttribute } = searchSlice.actions
export default searchSlice.reducer
