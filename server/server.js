const express = require('express')
const bodyParser = require('body-parser')
const ngrok = require('ngrok')
const decodeJWT = require('did-jwt').decodeJWT
const { Credentials } = require('uport-credentials')
const transports = require('uport-transports').transport
const message = require('uport-transports').message.util
const TruffleContract = require('truffle-contract');
const GNITokenCrowdsale = require('../truffle/build/contracts/GNITokenCrowdsale.json');
const SeedableCrowdsale = require('../truffle/build/contracts/SeedableCrowdsale.json');
const InactiveToken = require('../truffle/build/contracts/InactiveToken.json');
const ActiveToken = require('../truffle/build/contracts/ActiveToken.json');
const VotingToken = require('../truffle/build/contracts/VotingToken.json');
const Project = require('../truffle/build/contracts/Project.json');
const ProjectFactory = require('../truffle/build/contracts/ProjectFactory.json');
const Voting = require('../truffle/build/contracts/Voting.json');
const SeedableVoting = require('../truffle/build/contracts/SeedableVoting.json');
const Activation = require('../truffle/build/contracts/Activation.json');
const ProjectLeaderTracker = require('../truffle/build/contracts/ProjectLeaderTracker.json');
const Dividends = require('../truffle/build/contracts/Dividends.json');

const dotenv = require('dotenv');
dotenv.config();

const Web3 = require('web3');
const web3 = new Web3("https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY);

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
  const projectFactory = TruffleContract(ProjectFactory);
  projectFactory.setProvider(web3.currentProvider);
  console.log(web3.currentProvider, 'CURRENT PROVIDER')
  const truffleInst = projectFactory.at("0xb58937b6e5c79cb5254d60316a2b3580b8b58d9d");
  const abi = truffleInst.abi;
  const inst = new web3.eth.Contract(truffleInst.abi, "0xb58937b6e5c79cb5254d60316a2b3580b8b58d9d")
  inst.methods.totalProjectCount().call((err, result) => { console.log('result', result) })
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
