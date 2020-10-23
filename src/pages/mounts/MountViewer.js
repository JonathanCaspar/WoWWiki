import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Badge } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMountData } from './MountsSlice' // Actions
import { getLocaleByLang } from '../../api/BlizzardAPI'
import allianceImg from '../../assets/Alliance.png'
import hordeImg from '../../assets/Horde.png'
import './MountViewer.css'

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { getClassAssetById } from '../../api/BlizzardAssetsAPI'

const Mount = ({ name, description, source, asset, requirements = [] }) => {
  let { t, i18n } = useTranslation('common')
  let lang = i18n.language
  let locale = getLocaleByLang(lang)

  let renderedSource = source && (
    <Badge variant="dark" className="mount-source">
      <span className="badge-label">{t('common.source')} : </span>
      <span>{source[locale]}</span>
    </Badge>
  )

  let renderedRequirements = Object.keys(requirements).map((req) => {
    switch (req) {
      case 'faction':
        let factionName = requirements[req].name[locale]
        let factionImg = factionName === 'Alliance' ? allianceImg : hordeImg
        return (
          <Badge variant="dark" key={req}>
            <img
              src={factionImg}
              alt={factionName}
              className="mount-label-img"
            />
            <span>{factionName}</span>
          </Badge>
        )
      case 'classes':
        let wowClass = requirements[req]['0']
        let [classId, className] = [wowClass.id, wowClass.name[locale]]

        return (
          <Badge variant="dark" key={req}>
            <img
              src={getClassAssetById(classId)}
              alt={className}
              className="mount-label-img"
            />
            <span>{className}</span>
          </Badge>
        )

      default:
        return ''
    }
  })

  return (
    <div>
      <div className="mount-title">{name[locale]}</div>
      <div className="mount-badges">
        {renderedSource}
        {renderedRequirements}
      </div>
      <div className="mount-desc">{description[locale]}</div>
      <img src={asset} alt={name[locale]} id="mount-asset" />
    </div>
  )
}

function MountViewer({ match }) {
  const { mountId } = match.params

  const dispatch = useDispatch()
  const mount = useSelector((state) => state.mounts.mount)
  const mountAsset = useSelector((state) => state.mounts.mountAsset)
  const mountStatus = useSelector((state) => state.mounts.mountStatus)

  // Fetch mount data when no mount is loaded and mountStatus allows it
  useEffect(() => {
    if (mountStatus === 'idle') {
      dispatch(fetchMountData(mountId))
    }
  }, [mountStatus, mountId, dispatch])

  let renderedMount

  if (mountStatus === 'loading') renderedMount = <LoadingSpinner />
  else if (mountStatus === 'succeeded') {
    renderedMount = (
      <Mount
        name={mount?.name}
        description={mount?.description}
        source={mount?.source?.name}
        asset={mountAsset}
        requirements={mount?.requirements}
      />
    )
  } else if (mountStatus === 'failed')
    renderedMount = (
      <div>
        The given id <Badge variant="dark">{mountId}</Badge> does not exist.
      </div>
    )

  return (
    <div className="mount-viewer col-sm-8 col-md-8 col-lg-9">
      {renderedMount}
    </div>
  )
}
export default MountViewer
