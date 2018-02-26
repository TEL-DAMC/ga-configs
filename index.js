const OauthClient = require('./modules/gauth')

;(async function () {
  let credentials
  try {
    credentials = require('./credentials')
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      console.error('---\nCredenciais não encontradas. Siga as intruções do README.md\n---')
    } else {
      console.error(e)
    }
    return
  }
  const scope = [
    'https://www.googleapis.com/auth/analytics.edit'
  ]
  const oauth = await OauthClient(credentials, scope)

  try {
    const filters = await require('./modules/retrieveFilterLinks')('28390484', oauth)
    const util = require('util')
    console.log(util.inspect(filters.data, {colors: true, depth: null}))
  } catch (e) {
    console.log(e)
  }

  try {
    const filters = await require('./modules/retrieveAccountFilters')('28390484', oauth)
    const util = require('util')
    console.log(util.inspect(filters.data, {colors: true, depth: null}))
  } catch (e) {
    console.log(e)
  }
})()
