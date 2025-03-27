import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InitialState as EntityInitialState } from '../consts/contact'

const entitySlice = createSlice({
  name: 'entity',
  initialState: EntityInitialState,
  reducers: {
    cleanEntityState: () => {
      return EntityInitialState
    },
    updateEntityAttribute: (state, { payload }: PayloadAction<{ attribute: string; value: unknown }>) => {
      const { attribute, value } = payload
      return {
        ...state,
        [attribute]: value,
      }
    },
  },
})

export const { cleanEntityState, updateEntityAttribute } = entitySlice.actions
export default entitySlice.reducer
