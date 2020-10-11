import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMountById, fetchMountAsset, newMountClicked } from './MountsSlice' // Actions
//import { selectMountById } from './MountsSlice' // Selectors

import './MountViewer.css'
import Spinner from 'react-bootstrap/Spinner'

import { useTranslation } from 'react-i18next'

function MountViewer({ match }) {
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
    renderedMount = (
      <div className="center-div">
        <Spinner animation="border" role="status" size="sm" />
        <span>{t('common.loading')} ...</span>
      </div>
    )
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

  return <div className="mount-viewer col-8 col-sm-8">{renderedMount}</div>
}
export default MountViewer
