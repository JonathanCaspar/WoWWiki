import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { fetchMounts } from './MountsSlice' // Actions
//import { selectAllMounts } from './MountsSlice' // Selectors

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import './MountsList.css'

function MountsList() {
  const dispatch = useDispatch()
  const { t } = useTranslation('common')

  const mounts = useSelector((state) => state.mounts.data)
  const status = useSelector((state) => state.mounts.status)

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

  return <div className="nav-list section">{renderedList}</div>
}
export default MountsList
