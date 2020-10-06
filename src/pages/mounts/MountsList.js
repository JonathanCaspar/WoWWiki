import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { mountSelected, fetchMounts } from './MountsSlice' // Actions
import { selectAllMounts } from './MountsSlice' // Selectors

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import './MountsList.css'

const MountListItem = ({ name, id, onClickItem }) => {
  return (
    <div className="nav-list-row" onClick={() => onClickItem(name, id)}>
      {name}
    </div>
  )
}

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
    renderedList = <LoadingSpinner />
  } else if (status === 'succeeded') {
    const orderedMounts = mounts.slice().sort((a, b) => {
      a.name.localeCompare(b.name)
    })

    renderedList = orderedMounts.map((mount) => (
      <MountListItem
        name={mount.name}
        id={mount.id}
        onClickItem={() => {
          dispatch(mountSelected(mount.id))
        }}
        key={mount.id}
      />
    ))
  } else if (status === 'failed') {
    renderedList = <div>Couldn't load mounts</div>
  }

  return <div className="nav-list">{renderedList}</div>
}
export default MountsList
