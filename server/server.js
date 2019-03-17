const express = require('express')
const bodyParser = require('body-parser')
const ngrok = require('ngrok')
const decodeJWT = require('did-jwt').decodeJWT
const { Credentials } = require('uport-credentials')
const transports = require('uport-transports').transport
const message = require('uport-transports').message.util
const Web3 = require('web3');
const web3 = new Web3("https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY);
import TruffleContract from 'truffle-contract';
import GNITokenCrowdsale from '../truffle/build/contracts/GNITokenCrowdsale.json';
import SeedableCrowdsale from '../truffle/build/contracts/SeedableCrowdsale.json';
import InactiveToken from '../truffle/build/contracts/InactiveToken.json';
import ActiveToken from '../truffle/build/contracts/ActiveToken.json';
import VotingToken from '../truffle/build/contracts/VotingToken.json';
import Project from '../truffle/build/contracts/Project.json';
import ProjectFactory from '../truffle/build/contracts/ProjectFactory.json'
import Voting from '../truffle/build/contracts/Voting.json';
import SeedableVoting from '../truffle/build/contracts/SeedableVoting.json';
import Activation from '../truffle/build/contracts/Activation.json';
import ProjectLeaderTracker from '../truffle/build/contracts/ProjectLeaderTracker.json';
import Dividends from '../truffle/build/contracts/Dividends.json';

let endpoint = ''
const app = express();
app.use(bodyParser.json({ type: '*/*' }))

const {did, privateKey} = Credentials.createIdentity()
const credentials = new Credentials({
  appName: 'Genie Portal', did, privateKey
})

// app.get('/', (req, res) => {
//   credentials.createDisclosureRequest({
//     requested: ['name', 'email'],
//     callbackUrl: endpoint + '/callback'
//   }).then(requestToken => {
//     console.log(decodeJWT(requestToken))
//
//     // const uri = message.paramsToQueryString(message.messageToURI(requestToken), {callback_type: 'post'})
//     // const qr =  transports.ui.getImageDataURI(uri)
//     const transportQR = transports.qr.send()
//     transportQR(requestToken);
//     // res.send(transportQR)
//     // res.send(qr)
//   })
// })

app.get('/api/sup', (req, res) => {
  res.send({"message": "it works"});
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
