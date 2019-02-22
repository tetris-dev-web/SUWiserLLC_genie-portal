const express = require('express')
const bodyParser = require('body-parser')
const ngrok = require('ngrok')
const decodeJWT = require('did-jwt').decodeJWT
const { Credentials } = require('uport-credentials')
const transports = require('uport-transports').transport
const message = require('uport-transports').message.util

let endpoint = ''
const app = express();
app.use(bodyParser.json({ type: '*/*' }))

const {did, privateKey} = Credentials.createIdentity()
const credentials = new Credentials({
  appName: 'Genie Portal', did, privateKey
})

app.get('/', (req, res) => {
  credentials.createDisclosureRequest({
    requested: ['name', 'email'],
    callbackUrl: endpoint + '/callback'
  }).then(requestToken => {
    console.log(decodeJWT(requestToken))

    // const uri = message.paramsToQueryString(message.messageToURI(requestToken), {callback_type: 'post'})
    // const qr =  transports.ui.getImageDataURI(uri)
    const transportQR = transports.qr.send()
    transportQR(requestToken);
    // res.send(transportQR)
    // res.send(qr)
  })
})

// app.post('/callback', (req, res) => {
//   const jwt = req.body.access_token
//   credentials.authenticateDisclosureResponse(jwt).then(creds => {
//     // take this time to perform custom authorization steps... then,
//     // set up a push transport with the provided
//     // push token and public encryption key (boxPub)
//     const push = transports.push.send(creds.pushToken, creds.boxPub)
//
//     credentials.createVerification({
//       sub: creds.did,
//       exp: Math.floor(new Date().getTime() / 1000) + 30 * 24 * 60 * 60,
//       claim: {'Identity' : {'Last Seen' : `${new Date()}`}}
//       // Note, the above is a complex (nested) claim.
//       // Also supported are simple claims:  claim: {'Key' : 'Value'}
//     }).then(attestation => {
//       console.log(`Encoded JWT sent to user: ${attestation}`)
//       console.log(`Decodeded JWT sent to user: ${JSON.stringify(decodeJWT(attestation))}`)
//       return push(attestation)  // *push* the notification to the user's uPort mobile app.
//     }).then(res => {
//       console.log(res)
//       console.log('Push notification sent and should be recieved any moment...')
//       console.log('Accept the push notification in the uPort mobile application')
//       ngrok.disconnect()
//     })
//   })
// })

const server = app.listen(8080, () => {
  console.log("listening")
})
