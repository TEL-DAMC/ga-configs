const OAuth2 = require('googleapis').google.auth.OAuth2

module.exports = function (credentials, scope) {
  return new Promise((resolve, reject) => {
    const oauth2Client = new OAuth2(
      credentials.client_id,
      credentials.client_secret,
      'http://localhost'
    )

    require('google-cli-auth')({
      name: 'ga-config',
      client_id: credentials.client_id,
      client_secret: credentials.client_secret,
      scope: scope
    }, function (error, token) {
      if (error) {
        reject(error)
      } else {
        if (token.expires_at < (new Date()).getTime()) {
          token.refresh((err, res) => {
            if (err) {
              reject(err)
            } else {
              oauth2Client.credentials = res
              resolve(oauth2Client)
            }
          })
        } else {
          oauth2Client.credentials = token
          resolve(oauth2Client)
        }
      }
    })
  })
}
