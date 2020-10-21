import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { client, LOCALE } from '../../api/BlizzardAPI'

const mountsInitialState = {
  index: [],
  searchText: '',
  status: 'idle',
  error: null,
}
const currentMountInitialState = {
  mount: null,
  mountAsset: '',
  mountStatus: 'idle',
  mountError: null,
}

const initialState = { ...mountsInitialState, ...currentMountInitialState }

// Async thunk to fetch mounts list
export const fetchMountIndex = createAsyncThunk(
  'mounts/fetchMountIndex',
  async () => {
    const response = await client.getMountIndex('eu', 'static-eu')
    return response.data.mounts
  }
)

export const fetchMountData = createAsyncThunk(
  'mounts/fetchMountData',
  async (mountId, thunkAPI) => {
    let dispatch = thunkAPI.dispatch
    let getState = thunkAPI.getState

    // Fetching mount data first
    if (mountId >= 0)
      return await dispatch(fetchMount(mountId)).then(
        () => {
          let mount = getState().mounts.mount
          return Promise.all([dispatch(fetchMountAsset(mount))])
        },
        () => {
          return Promise.reject('Failed to fetchMount')
        }
      )
    else return Promise.reject(`Mount id ${mountId} passed is invalid.`)
  }
)

// Async thunk to fetch mount data by its id
export const fetchMount = createAsyncThunk(
  'mounts/fetchMount',
  async (mountId) => {
    const response = await client.getMountById(mountId, 'eu', 'static-eu')
    return response.data
  }
)

// Async thunk to fetch asset by mount object (received by fetchMount())
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
      return { ...state, ...currentMountInitialState }
    },
    mountSearched(state, action) {
      state.searchText = action.payload
    },
  },
  extraReducers: {
    // Fetch mounts index
    [fetchMountIndex.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchMountIndex.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.index = state.index.concat(action.payload)
    },
    [fetchMountIndex.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error
    },

    // Fetch mount information
    [fetchMount.fulfilled]: (state, action) => {
      state.mount = action.payload
    },

    // Fetch all data (information, asset...) of selected mount
    [fetchMountData.pending]: (state) => {
      state.mountStatus = 'loading'
    },
    [fetchMountData.fulfilled]: (state, action) => {
      // Payload['0'] is the first promise payload handled by fetchMountData
      state.mountStatus = 'succeeded'
      state.mountAsset = action.payload['0'].payload.assets['0'].value
    },
    [fetchMountData.rejected]: (state, action) => {
      state.mountStatus = 'failed'
      console.log(action)
      state.mountError = action.error
    },
  },
})

export const { newMountClicked, mountSearched } = MountsSlice.actions

export default MountsSlice.reducer

export const selectAllMounts = (state) => state.mounts.index
export const selectSearchText = (state) => state.mounts.searchText
export const selectCurrentMount = (state) => state.mounts.mount
export const selectMountById = (state, mountId) =>
  state.mounts.data.find((mount) => mount.id === mountId)

export const selectFilteredMounts = createSelector(
  [selectAllMounts, selectSearchText, (state, lang) => lang],
  (mounts, searchText, lang) => {
    let filteredMounts = mounts.filter((mount) => {
      let name = mount.name[lang] || mount.name[LOCALE.en]

      return name.toLowerCase().includes(searchText)
    })

    let orderedMounts = filteredMounts.slice().sort((a, b) => {
      let nameA = a.name[lang] || a.name[LOCALE.en]
      let nameB = b.name[lang] || b.name[LOCALE.en]

      return nameA.localeCompare(nameB)
    })

    return orderedMounts
  }
)
