const express = require('express')
const bodyParser = require('body-parser')
const ngrok = require('ngrok')
const decodeJWT = require('did-jwt').decodeJWT
const { Credentials } = require('uport-credentials')
const transports = require('uport-transports').transport;
const message = require('uport-transports').message.util;
const { asyncMiddleware } = require('./middlewares/async_middleware');
const { fetchProjects, dataByProject } = require('./chain_api/projects_chain_api');
const { capitalHistoryData } = require('./controllers/capital_history_controller');
const { tokenGraphData } = require('./controllers/token_graph_controller');
const { fetchWeiRaised } = require('./chain_api/crowdsale_chain_api')

let endpoint = ''
const app = express();

app.use(bodyParser.json({ type: '*/*' }))

app.get('/api/shared_project_graph_data', asyncMiddleware(async (req, res) => {
  const projects = await fetchProjects();
  const weiRaised = await fetchWeiRaised();
  res.send({projects, weiRaised});
}));

app.get('/api/capital_history_data', asyncMiddleware(async (req, res) => {
  const _capitalHistoryData = await capitalHistoryData();
  res.send(_capitalHistoryData)
}));

app.post('/api/token_graph_data', asyncMiddleware(async (req, res) => {
  const { body } = req;
  const { currentViewType, account } = body;
  const _tokenGraphData = await tokenGraphData(currentViewType, account);
  res.send(_tokenGraphData);
}));

const server = app.listen(8080, () => {
  console.log("listening")
})
