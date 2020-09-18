import axios from 'axios'

const BlizzardAPI = axios.create({
  baseURL: 'https://eu.api.blizzard.com',
})

function getAccessToken(callback) {
  fetch('https://us.battle.net/oauth/token', {
    body: 'grant_type=client_credentials',
    headers: {
      Authorization:
        'Basic ZTFkOWI3Zjk3MGY0NDIyOWJkYTE5NDJkMDlkM2NlOTc6MWNVZFRSeFdzV01wMjN4T283Rmg0akFMV1pGUkNsUXU=',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  })
    .then((result) => result.json())
    .then(
      (result) => {
        callback(result['access_token'])
      },
      (error) => {
        console.log(
          'Blizzard API - error while fetching access token :' + error
        )
      }
    )
}

function getMountsList(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const params = { params: { region: eu } }

  BlizzardAPI.get('/data/wow/mount/index', config).then(
    (result) => {
      return result
    },
    (error) => {
      console.log('error : ' + error)
    }
  )
}
export default {
  BlizzardAPI,
  getAccessToken,
  getMountsList,
}
