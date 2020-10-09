import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/BlizzardAPI'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  selectedMount: null,
  selectedMountAsset: '',
  selectedMountStatus: 'idle',
  selectedMountError: null,
}

// Async thunk to fetch mounts list
export const fetchMounts = createAsyncThunk('mounts/fetchMounts', async () => {
  const response = await client.getMountIndex('eu', 'static-eu', 'fr_FR')
  return response.data.mounts
})

// Async thunk to fetch mount data by its id
export const fetchMountById = createAsyncThunk(
  'mounts/fetchMountById',
  async (mountId) => {
    const response = await client.getMountById(
      mountId,
      'eu',
      'static-eu',
      'fr_FR'
    )
    return response.data
  }
)

// Async thunk to fetch asset by mount object (received by fetchMountById())
export const fetchMountAsset = createAsyncThunk(
  'mounts/fetchMountAsset',
  async (mount) => {
    if (mount) {
      const response = await client(mount.creature_displays['0'].key.href)
      return response.data
    } else
      return Promise.reject('Need a mount object in order to fetch its asset')
  }
)

const MountsSlice = createSlice({
  name: 'mounts',
  initialState,
  reducers: {
    newMountClicked(state) {
      state.selectedMount = null
      state.selectedMountAsset = ''
      state.selectedMountStatus = 'idle'
      state.selectedMountError = null
    },
  },
  extraReducers: {
    [fetchMounts.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchMounts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.data = state.data.concat(action.payload)
    },
    [fetchMounts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    [fetchMountById.pending]: (state) => {
      state.selectedMountStatus = 'loading'
    },
    [fetchMountById.fulfilled]: (state, action) => {
      state.selectedMountStatus = 'succeeded'
      state.selectedMount = action.payload
    },
    [fetchMountById.rejected]: (state, action) => {
      state.selectedMountStatus = 'failed'
      state.selectedMountError = action.payload
    },
    [fetchMountAsset.fulfilled]: (state, action) => {
      state.selectedMountAsset = action.payload.assets['0'].value
    },
  },
})

export const { newMountClicked } = MountsSlice.actions

export default MountsSlice.reducer

export const selectAllMounts = (state) => state.mounts.data

export const selectMountById = (state, mountId) =>
  state.mounts.data.find((mount) => mount.id === mountId)