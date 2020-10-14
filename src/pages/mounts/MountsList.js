import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { fetchMountIndex, mountSearched } from './MountsSlice' // Actions
import { selectFilteredMounts } from './MountsSlice' // Selectors
import { getLocaleByLang } from '../../api/BlizzardAPI'

import './MountsList.css'
import SearchBar from '../../components/SearchBar/SearchBar'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

function MountsList() {
  const dispatch = useDispatch()
  const { i18n } = useTranslation('common')
  const lang     = getLocaleByLang(i18n.language || 'en')
  const status   = useSelector((state) => state.mounts.status)
  const mounts   = useSelector((state) => selectFilteredMounts(state,lang))

  const handleSearch = (query) => {
    dispatch(mountSearched(query))
  }

  // Fetching mounts list
  useEffect(() => {
    if (status === 'idle') dispatch(fetchMountIndex())
  }, [status, dispatch])

  let renderedList

  if (status === 'loading') renderedList = <LoadingSpinner />
  else if (status === 'succeeded') {
    const orderedMounts = mounts.slice().sort((a, b) => {
      return a.name[lang].localeCompare(b.name[lang])
    })

    renderedList = orderedMounts.map((mount) => (
      <Link key={mount.id} className="nav-list-row" to={`/mounts/${mount.id}`}>
        {mount.name[lang]}
      </Link>
    ))
  } else if (status === 'failed') renderedList = <div>Couldn't load mounts</div>

  return (
    <div className="col-md-6 col-lg-3">
      <SearchBar onChangeCallback={handleSearch} />
      <div className="nav-list">{renderedList}</div>
    </div>
  )
}
export default MountsList
