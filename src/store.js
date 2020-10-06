import { configureStore } from '@reduxjs/toolkit'

import mountsReducers from './pages/mounts/MountsSlice'

export default configureStore({
  reducer: {
    mounts: mountsReducers,
  },
})
