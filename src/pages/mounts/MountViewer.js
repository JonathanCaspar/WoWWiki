import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMountById, fetchMountAsset } from './MountsSlice' // Actions
import { selectMountById } from './MountsSlice' // Selectors

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import './MountViewer.css'

export function MountViewer() {
  const dispatch = useDispatch()

  const selectedMount = useSelector((state) => state.mounts.selectedMount)
  const selectedMountId = useSelector((state) => state.mounts.selectedMountId)
  const selectedMountStatus = useSelector(
    (state) => state.mounts.selectedMountStatus
  )

  // If selected mount id changed : fetch selected mount info
  useEffect(() => {
    if (selectedMountStatus === 'idle' && selectedMountId) {
      dispatch(fetchMountById(selectedMountId))
    }
  }, [selectedMountId, dispatch])

  let renderedMount

  if (selectedMountStatus === 'loading') {
    renderedMount = <LoadingSpinner />
  } else if (selectedMountStatus === 'succeeded') {
    renderedMount = (
      <div>
        <div className="mount-name">{selectedMount.name}</div>
        <div className="mount-desc">{selectedMount.description}</div>
        <img src={''} alt={selectedMount.name} />
      </div>
    )
  } else if (selectedMountStatus === 'failed') {
    renderedMount = <div>Couldn't load mount</div>
  }

  return <div className="mount-viewer">{renderedMount}</div>
}
export default MountViewer

/*async fetchMount() {


    //let blizzardAPI = new BlizzardAPI()
    await blizzardAPI
      .getMountById(this.props.mountid, 'eu', 'static-eu', 'fr_FR')
      .then(
        (result) => {
          this.setState({
            loading: false,
            mount: result.data,
          })
        },
        (error) => {
          console.log('Erreur ComponentDidUpdate pendant getMountById' + error)
          this.setState({ error: true })
        }
      )

    await blizzardAPI
      .get(this.state.mount.creature_displays['0'].key.href)
      .then((result) => {
        this.setState({ asset: result.data.assets['0'].value })
      })
  }*/
