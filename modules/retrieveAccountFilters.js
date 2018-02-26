module.exports = function (account, oauthClient) {
  return new Promise((resolve, reject) => {
    const analytics = require('googleapis').google.analytics('v3')

    analytics.management.filters.list({
      accountId: account,
      auth: oauthClient
    },
    (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
