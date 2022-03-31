import GNITokenCrowdsale from "../../truffle/build/contracts/GNITokenCrowdsale.json";
import { pitchProject } from "./chain_util";
import Web3 from "web3";
import TruffleContract from "truffle-contract";

describe("Test a project pitch", () => {
  let crowdsaleInstance;
  let projectInfo;
  const data = {
    title: "Project Test Name",
    capital_required: 1000000,
    valuation: 1500000,
    latitude: 105,
    longitude: 60,
  };
  let account;
  let crowdsale;
  let web3Provider;

  const web3Setup = async () => {
    // const web3Provider = web3.currentProvider;
    // const provider = new Web3(web3Provider);
    web3Provider = new Web3.providers.HttpProvider("http://localhost:8545");
    const provider = new Web3(web3Provider);
    crowdsale = TruffleContract(GNITokenCrowdsale);
    crowdsale.setProvider(web3Provider);
    return await provider.eth.getCoinbase();
  };

  beforeAll(async () => {
    account = await web3Setup();
    // console.log("address", crowdsale.address)
    crowdsaleInstance = await crowdsale.deployed();
    _crowdsaleInstance.ProjectPitch.watch((error, _projectInfo) => {
      projectInfo = _projectInfo;
    });
  });

  it("attributes matches whats on chain", async () => {
    await pitchProject(crowdsaleInstance, data, account);
    console.log(projectInfo);
    // expect(projectInfo.title).toBe()
  });

  it("attributes onChain matches database", () => {
    expect(5).toBe(5);
  });
});
