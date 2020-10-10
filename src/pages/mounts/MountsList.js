import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { fetchMounts, mountSearched } from './MountsSlice' // Actions
//import { selectAllMounts } from './MountsSlice' // Selectors

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import './MountsList.css'
import SearchBar from '../../components/SearchBar/SearchBar'

function MountsList() {
  const dispatch = useDispatch()
  const { t } = useTranslation('common')

  const mounts = useSelector((state) =>
    state.mounts.data.filter((mount) =>
      mount.name.toLowerCase().includes(state.mounts.searchText)
    )
  )
  const status = useSelector((state) => state.mounts.status)

  const handleSearch = (query) => {
    dispatch(mountSearched(query))
  }

  // Fetching mounts list
  useEffect(() => {
    if (status === 'idle') dispatch(fetchMounts())
  }, [status, dispatch])

  let renderedList

  if (status === 'loading') {
    renderedList = <LoadingSpinner text={t('common.loading')} />
  } else if (status === 'succeeded') {
    const orderedMounts = mounts.slice().sort((a, b) => {
      return a.name.localeCompare(b.name)
    })

    renderedList = orderedMounts.map((mount) => (
      <Link key={mount.id} className="nav-list-row" to={`/mounts/${mount.id}`}>
        {mount.name}
      </Link>
    ))
  } else if (status === 'failed') {
    renderedList = <div>Couldn't load mounts</div>
  }

  return (
    <div className="nav-list section">
      <SearchBar onChangeCallback={handleSearch} />
      {renderedList}
    </div>
  )
}
export default MountsList
