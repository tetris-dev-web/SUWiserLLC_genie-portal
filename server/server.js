const express = require('express')
const bodyParser = require('body-parser')
const ngrok = require('ngrok')
const decodeJWT = require('did-jwt').decodeJWT
const { Credentials } = require('uport-credentials')
const transports = require('uport-transports').transport;
const message = require('uport-transports').message.util;
const { asyncMiddleware } = require('./middlewares/async_middleware');
const { fetchProjectsData, dataByProject } = require('./chain_api/projects_chain_api');
const { fetchTokenTransfers } = require('./chain_api/token_chain_api');
const { fetchWeiRaised } = require('./chain_api/crowdsale_chain_api')

let endpoint = ''
const app = express();

app.use(bodyParser.json({ type: '*/*' }))

app.get('/api/project_graph_data', asyncMiddleware(async (req, res) => {
  const projectsData = await fetchProjectsData();
  const weiRaised = await fetchWeiRaised();
  res.send({projectsData, weiRaised});
}));

app.get('/api/token_graph_data', asyncMiddleware(async (req, res) => {
  const tokenTransfers = await fetchTokenTransfers();
  res.send(tokenTransfers);
}))

const server = app.listen(8080, () => {
  console.log("listening")
})
