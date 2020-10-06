import axios from 'axios'

const client_id = 'e1d9b7f970f44229bda1942d09d3ce97'
const client_secret = '68t8Dc1UBHEX3oQC3nMLXKINoQ7Mz4Ik'
const BLIZZARD_ENDPOINT = 'https://eu.api.blizzard.com'

async function requestAuthToken() {
  console.log('...Requesting Auth Token')

  return await axios.post(
    'https://us.battle.net/oauth/token',
    {},
    {
      auth: {
        username: `${client_id}`,
        password: `${client_secret}`,
      },
      params: { grant_type: 'client_credentials' },
    }
  )
}

async function getAuthToken() {
  let token = localStorage.getItem('blizzard_token')
  let token_expire_time = localStorage.getItem('blizzard_token_expire_time')

  // Token is available in local storage
  if (token !== null) {
    // Check if expired
    if (token_expire_time !== null) {
      let isTokenExpired =
        Math.floor(Date.now() / 1000) > token_expire_time - 900 // 15min before expire time
      if (!isTokenExpired) {
        // Token is not expired
        console.log('...found token : ' + token)
        return token
      }
    }
  }
  // Request new token because no one is available or up to date
  return await requestAuthToken().then(
    (result) => {
      // Check HTTP status code (200)
      token = result.data.access_token

      let new_expire_date =
        Math.floor(Date.now() / 1000) + result.data.expires_in

      console.log(result)
      console.log('... Putting in local storage blizzard_token : ' + token)
      localStorage.setItem('blizzard_token', result.data.access_token)

      console.log(
        '... Putting in local storage blizzard_token_expire_time : ' +
          new_expire_date
      )
      localStorage.setItem('blizzard_token_expire_time', new_expire_date)

      return result.data.access_token
    },
    (error) => {
      console.log('Blizzard API - error while fetching access token :' + error)
      return null
    }
  )
}

export async function client(endpoint, { body, ...customConfig } = {}) {
  const token = await getAuthToken()
  const headers = { 'Content-Type': 'application/json' }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
      Authorization: `Bearer ${token}`,
    },
    validateStatus: function (status) {
      return status == 200
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }
  return axios(endpoint, { ...config }).then(
    (result) => {
      return result
    },
    (error) => {
      return Promise.reject(error.message)
    }
  )
}

// Returns mounts index list (eu, static-eu, fr_FR)
client.getMountIndex = async function (region, namespace, locale) {
  return await client(BLIZZARD_ENDPOINT + '/data/wow/mount/index', {
    params: {
      region: `${region}`,
      namespace: `${namespace}`,
      locale: `${locale}`,
    },
  })
}

client.getMountById = async function (mountid, region, namespace, locale) {
  return await client(BLIZZARD_ENDPOINT + `/data/wow/mount/${mountid}`, {
    params: {
      region: `${region}`,
      namespace: `${namespace}`,
      locale: `${locale}`,
    },
  })
}
