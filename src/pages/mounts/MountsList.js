import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import {
  fetchMountIndex,
  mountSearched,
  newMountClicked,
  selectCurrentMount,
} from './MountsSlice' // Actions
import { selectFilteredMounts } from './MountsSlice' // Selectors
import { getLocaleByLang } from '../../api/BlizzardAPI'

import './MountsList.css'
import SearchBar from '../../components/SearchBar/SearchBar'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

function MountsList() {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation('common')
  const lang = i18n.language
  const locale = getLocaleByLang(lang || 'en')
  const status = useSelector((state) => state.mounts.status)
  const searchText = useSelector((state) => state.mounts.searchText)
  const mounts = useSelector((state) => selectFilteredMounts(state, locale))
  const selectedMount = useSelector((state) => selectCurrentMount(state))

  const handleSearch = (query) => {
    dispatch(mountSearched(query))
  }

  // Fetch mounts list
  useEffect(() => {
    dispatch(fetchMountIndex())
  }, [dispatch])


  let renderedList

  if (status === 'loading') renderedList = <LoadingSpinner />
  else if (status === 'succeeded') {
    if (!mounts.length) {
      renderedList = (
        <p>
          {t('common.no_result_for')} "{searchText}"
        </p>
      )
    } else {
      renderedList = mounts.map((mount) => {
        let selectedTag = (selectedMount?.id === mount.id) ? 'mount-selected' : ''

        return (
          <Link
            key={mount.id}
            to={`/mounts/${mount.id}`}
            id={selectedTag}
            data-wowhead={`https://${lang}.wowhead.com/mount=${mount.id}`}
            onClick={() => dispatch(newMountClicked())}
          >
            {mount.name[locale]}
          </Link>
        )
      })
    }
  } else if (status === 'failed') renderedList = <div>Couldn't load mounts</div>

  return (
    <div className="col-sm-4 col-md-4 col-lg-3">
      <SearchBar onChange={handleSearch} />
      <div className="nav-list">{renderedList}</div>
    </div>
  )
}
export default MountsList
