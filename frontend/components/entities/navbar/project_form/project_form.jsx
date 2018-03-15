import React from 'react';

class ProjectForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      valuation: '',
      video: '',
      icon: '',
      description: '',
      creator_id: props.currentUser.id
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearProjectErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log('state', this.state);
    // console.log('submitted');

    // this.props.contract.mint(this.props.account, 3000, {from:this.props.account});

    let project = {
      title: this.state.title,
      valuation: this.state.valuation,
      video: this.state.video,
      icon: this.state.icon,
      description: this.state.description,
      creator_id: this.state.creator_id
    };
    // creator_id: this.props.currentUser.id

    this.props.createProject(project).then( () => {
      this.props.closeModal();
    });
  }

  update(property) {
    return (e) => {
      this.setState({ [property]: e.currentTarget.value });
    };
  }

  renderErrors() {
    if (this.props.errors) {
      return (
        <ul className="project-errors">
          {this.props.errors.map((error, idx) => (
            <li key={idx}>
              {error}
            </li>
          ))}
        </ul>
      );
    }
  }

  render() {

    const geojsons = [];
    for (let i = 0; i < 5; i++) {
      geojsons.push(
        <tr key={i}>
          <td>
            <input
              type="text"
              placeholder="choose geojson"
              className="file-input" />
          </td>
          <td>
            <img
              src="http://res.cloudinary.com/genus-development/image/upload/v1506637305/saveIcon-01_vzsjnb.png"
              className="upload-icon" />
          </td>
          <td>
            <input
              type="checkbox"
              className="geo-checkbox" />
          </td>
          <td>
            <input
              type="checkbox"
              className="geo-checkbox" />
          </td>
        </tr>
      );
    }

    const file = ['choose json', 'choose csv', 'choose mpg'];
    const fileTitle = ['cashflow data', 'financials', 'plan'];
    const files = [];
    for (let i = 0; i < 3; i++) {
      files.push(
        <tr key={i}>
          <td>
            <input
              type="text"
              placeholder={file[i]}
              className="file-input" />
          </td>
          <td className="upload-icon-cont">
            <img
              src="http://res.cloudinary.com/genus-development/image/upload/v1506637305/saveIcon-01_vzsjnb.png"
              className="upload-icon file-upload-icon" />
          </td>
          <td className="file-title">{fileTitle[i]}</td>
        </tr>
      );
    }

    let { title, valuation, video,
          description, plan_pdf, icon } = this.state;

    return (
      <form className="form-box">
        <input
          type="text"
          placeholder="#| project title"
          value={title}
          className="project-title-input"
          onChange={this.update('title')} />
        <div className="valuation-container">
          <input
            type="text"
            placeholder="#| valuation"
            value={valuation}
            className="valuation-input"
            onChange={this.update('valuation')} />
          <div className="coin-count">30000</div>
          <div className="coin-text">coins to be issued</div>
        </div>

        <hr className="project-divider" />

        <table className="file-table spatial-overlays">
          <tbody>
            <tr className="table-header">
              <th className="t-header-md">spatial overlays</th>
              <th></th>
              <th>hierarchy</th>
              <th>opacity</th>
            </tr>
            {geojsons}
          </tbody>
        </table>

        <hr className="project-divider" />

        <table className="file-table project-files">
          <tbody>
            {files}
          </tbody>
        </table>

        <div className="link-upload-cont">
          <input
            type="text"
            placeholder="paste video url here"
            value={video}
            className="link-input"
            onChange={this.update('video')} />
        </div>

        <div className="link-upload-cont">
          <input
            type="text"
            placeholder="paste icon image url here"
            value={icon}
            className="link-input"
            onChange={this.update('icon')} />
        </div>

        <hr className="project-divider" />

        <label className="p-form-label">
          description
        </label>
        <textarea
          value={ description }
          className="p-form-description"
          onChange={this.update('description')} />
        <div className="pitch-button-cont">
          <input
            className="pitch-button"
            type="submit"
            value="pitch"
            onClick={this.handleSubmit} />
        </div>
        {this.renderErrors()}
        <div className="blue-close-modal-button close-modal-button"
          onClick={this.props.closeModal}>&times;</div>
      </form>
    );
  }
}

export default ProjectForm;
