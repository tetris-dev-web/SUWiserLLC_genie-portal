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
    const uri = message.paramsToQueryString(message.messageToURI(requestToken), {callback_type: 'post'})
    const qr =  transports.ui.getImageDataURI(uri)
    // console.log(qr);
    res.send(qr)
  })
})



const server = app.listen(8080, () => {
  console.log("listening")
}, (err) => {
  console.log(`ERR ${err}`)
})
