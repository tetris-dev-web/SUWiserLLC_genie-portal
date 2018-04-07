import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './modal_style';

class BylawsModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
    };

    window.SessionOpenModal = () => {
      this.setState({openModal: true});
    };

    window.SessionOpenModal = window.SessionOpenModal.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ openModal: true });
  }

  closeModal() {
    this.setState({ openModal: false });
  }

  render() {
    return(
      <div>
        <div className="bylaw-button" onClick={this.openModal}>BYLAWS</div>
        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.closeModal}
          style={ModalStyle}
          contentLabel="Bylaws Modal"
          className="modal-container">
          <div className="black-close-modal-button close-modal-button"
            onClick={this.closeModal}>&times;</div>
          <div className="ft-modal-header-cont">
            <div className="ft-modal-header bylaws-header">
              Bylaws
            </div>
          </div>
          <div className="ft-modal-body bylaws-body">
            <div className="ft-img-cont">
              <img className="ft-img" src="https://s3.amazonaws.com/genie-portal-dev/static/org-structure.png"></img>
            </div>
            <div className="ft-el-cont">
              <h1 className="ft-el-header">Organizational Structure</h1>
              <p><strong>Name: </strong>Genus Development Partners, otherwise known as Genus Dev.</p>
              <p><strong>Purpose: </strong>Genus Development Partners (GenusDev) is the parent company to a series of projects that makes use of disruptive technology to radically shift how capital and humans flow in major urban cities. </p>
              <p><strong>Genus Management: </strong>Because the Parent company’s ownership is split between the team developing the projects and investors who invest in the projects, a separate entity will be formed that is owned by the executive administration of the company. The entity’s name is Genus Management (GenusMGT). GenusMGT will hold on to 12.5% of the equity dispersed as compensation for the development and execution of the projects under Genus Development Partner’s umbrella. The    entity will have to negotiate management decisions and strategy over the proposed projects with individual investors. But as likely the largest stakeholder over a project, Genus Core is expected to act as the parent company’s steward in spearheading management decisions. </p>
            </div>
            <div className="ft-el-cont">
              <h1 className="ft-el-header">Equity Structure</h1>
              <p><strong>Valuations: </strong>The overall equity in the company will reflect evaluations of the current and potential cash flow of the company and will manifest as tokens, delivered through the Genie web portal. Each new project prospect will mean a potentially new cash flow and with its proposal will be an associated increase in tokens. If the value of the future proposed project doesn’t reflect the expectations in the market, the discrepancy will be reflected in a change of the price of the company’s token.</p>
              <p><strong>Token Transfer: </strong>All tokens will be resellable on secondary markets through intermediaries like AirSwap. All transfers on secondary markets must follow the appropriate regulations of the state in which the transfers are taking place.</p>
              <p><strong>Token Disposal: </strong>An equity token cannot be destroyed once created. If a token holder wishes to dispose of their asset, their sole option is to sell it through secondary markets.

              The Genus Development Partnership will exist as a semi-public pass through limited liability company, with the equity being sold through its portal existing as a distribution of ownership in the partnership as a whole.

              Contractors, partners, and employees will be primarily compensated in equity in the parent company, not GenusMGT. GenusMGT ownership will be closely held among the key administrators of the whole network. These individuals will use the proceeds from the Core’s equity to pay executive salaries and all expenses not absorbed by the income in the individual projects.
              </p>
              <p><strong>Dividend Disbursements: </strong>All profits will be distributed quarterly as dividends to stakeholders possessing a token. Any wallet that holds a token will be sent a proportional amount of ether based on the number of tokens held and the profits achieved that quarter. </p>
            </div>
            <div className="ft-el-cont">
              <h1 className="ft-el-header">Decision Making and Communication</h1>
              <p><strong>Voting: </strong>While fractions of a token can be sold and traded, one must hold “1” whole token to have voting privileges over proposed projects. </p>
              <p><strong>Decision Framework: </strong>Each person is designated a voting token at bi-annual intervals. They can designate their voting token to a proposed project. Regardless of the funding amount, the project with the most votes is funded first. Once the funding limit of the project with the most votes is reached, the funds in escrow are distributed to the development company and a new escrow fund is filled with equity contributions until the financial target of the next most voted on project is reached. While funds are in limbo, they will be managed by the Holding Company under a financial guarantee that the principle cannot be lost. Any potential losses would be absorbed by an existing pool of funds under management. </p>
              <p><strong>Meetings: </strong>The development company will host virtual and in-person bi-annual meetings at which time it will host proposals to change the bylaws, organizational structure, or strategy. Anyone who holds one whole token may attend these meetings and submit proposals. </p>
            </div>
            <div className="ft-el-cont">
              <h1 className="ft-el-header">Project Management</h1>
              <p><strong>Management Stake: </strong>12.5% of the equity of each project will be retained by Genus Core as compensation for developing and executing the projects under the organizational umbrella of the parent company, meaning that 80% of the equity in the proposed projects will be sold to investors. </p>
              <p><strong>Proposals: </strong>The projects under management are proposed by the administrators of Genus Development Partners. Project proposals can be sent to them for consideration, but users are not able to pitch projects directly to the portal. The portal will operate at the scope of the developer, though Genus will ideally be linked into a larger network of investors. </p>
              <p><strong>Project Direction: </strong>Each project will be proposed with a management team. The direction of the project will be set in collaboration with Genus Core, with inputs and feedback prompts provided through the website. </p>
            </div>
            <div className="ft-img-cont">
              <img className="ft-img" src="https://s3.amazonaws.com/genie-portal-dev/static/equity.png"></img>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default BylawsModal;
