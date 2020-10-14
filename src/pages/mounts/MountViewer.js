import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMountData, newMountClicked } from './MountsSlice' // Actions
//import { selectMountById } from './MountsSlice' // Selectors
import { getLocaleByLang } from '../../api/BlizzardAPI'
import { useTranslation } from 'react-i18next'

import './MountViewer.css'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

const Mount = ({ name, description, asset }) => {
  let { i18n } = useTranslation('common')
  let lang     = getLocaleByLang(i18n.language || 'en')

  return (
    <div>
      <div className="mount-name">{name[lang]}</div>
      <div className="mount-desc">{description[lang]}</div>
      <img src={asset} alt={name[lang]} />
    </div>
  )
}

function MountViewer({ match }) {
  const { mountId } = match.params

  const dispatch    = useDispatch()
  const mount       = useSelector((state) => state.mounts.mount)
  const mountAsset  = useSelector((state) => state.mounts.mountAsset)
  const mountStatus = useSelector((state) => state.mounts.mountStatus)

  // When mountId (prop passed by router) changes : dispatch newMountClicked
  useEffect(() => {
    if (mountStatus !== 'idle') {
      dispatch(newMountClicked())
    }
  }, [mountId, dispatch])

  // If mount info hasn't been fetched, fetch it
  useEffect(() => {
    if (mountStatus === 'idle') {
      dispatch(fetchMountData(mountId))
    }
  }, [mountStatus, dispatch])

  let renderedMount

  if (mountStatus === 'loading') renderedMount = <LoadingSpinner />
  else if (mountStatus === 'succeeded') {
    renderedMount = (
      <Mount
        name        = {mount.name}
        description = {mount.description}
        asset       = {mountAsset}
      />
    )
  } else if (mountStatus === 'failed')
    renderedMount = <div>The mount id {mountId} does not exist.</div>

  return <div className="mount-viewer col-md-6 col-lg-9">{renderedMount}</div>
}
export default MountViewer
