import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMountById, fetchMountAsset, newMountClicked } from './MountsSlice' // Actions
//import { selectMountById } from './MountsSlice' // Selectors

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import './MountViewer.css'
import { useTranslation } from 'react-i18next'

export function MountViewer({ match }) {
  const { mountId } = match.params

  const dispatch = useDispatch()
  const { t } = useTranslation('common')

  const mount = useSelector((state) => state.mounts.selectedMount)
  const mountStatus = useSelector((state) => state.mounts.selectedMountStatus)
  const mountAsset = useSelector((state) => state.mounts.selectedMountAsset)

  // When mountId (prop passed by router) changes : dispatch newMountClicked
  useEffect(() => {
    if (mountStatus !== 'idle') {
      dispatch(newMountClicked())
    }
  }, [mountId, dispatch])

  // If mount info hasn't been fetched, fetch it
  useEffect(() => {
    if (mountStatus === 'idle') {
      dispatch(fetchMountById(mountId))
    }
  }, [mountStatus, dispatch])

  // When selected mount exists : fetch mount asset
  useEffect(() => {
    if (mount) {
      dispatch(fetchMountAsset(mount))
    }
  }, [mount, dispatch])

  let renderedMount

  if (mountStatus === 'loading') {
    renderedMount = <LoadingSpinner text={t('common.loading')} />
  } else if (mountStatus === 'succeeded') {
    renderedMount = (
      <div>
        <div className="mount-name">{mount.name}</div>
        <div className="mount-desc">{mount.description}</div>
        <img src={mountAsset} alt={mount.name} />
      </div>
    )
  } else if (mountStatus === 'failed') {
    renderedMount = <div>The mount id {mountId} does not exist.</div>
  }

  return <div className="mount-viewer section">{renderedMount}</div>
}
export default MountViewer
