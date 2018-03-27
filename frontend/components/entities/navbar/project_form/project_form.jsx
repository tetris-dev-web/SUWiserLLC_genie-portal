import React from 'react';
import { totalData } from '../../../../util/token_data_util';

class ProjectForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      valuation: '',
      video: '',
      icon: '',
      description: '',
      creator_id: props.currentUser.id,
      imageFile: '',
      imageUrl: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFile = this.updateFile.bind(this);
  }

  componentDidMount() {
    this.renderFileName();
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

  updateFile(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () =>
      this.setState({ imageUrl: reader.result, imageFile: file});

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null });
    }
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

  renderFileName() {
    const inputs = document.querySelectorAll( '.file-input' );
    Array.prototype.forEach.call( inputs, function( input ) {
      const label	 = input.nextElementSibling;
      const labelVal = label.innerHTML;

      input.addEventListener('change', function(e) {
        let fileName = e.target.value.split( '\\' ).pop();
        // let fileName = '';
        // if (this.files && this.files.length > 1 ) {
        //   fileName = ( this.getAttribute('data-multiple-caption' ) || '')
        //                 .replace('{count}', this.files.length);
        // } else {
        //   fileName = e.target.value.split( '\\' ).pop();
        // }

        if (fileName) {
          label.querySelector('span').innerHTML = fileName;
        } else {
          label.innerHTML = labelVal;
        }
      });
    });
  }

  render() {

    const geojsons = [];
    const fileId = ["file1", "file2", "file3", "file4", "file5"];
    for (let i = 0; i < 5; i++) {
      geojsons.push(
        <tr key={i}>
          <td>
            <input id={fileId[i]}
              name={fileId[i]}
              className="file-input"
              type="file" />
            <label htmlFor={fileId[i]}>
              <span>choose geojson</span>
            </label>
          </td>
          <td>
            <input type="checkbox"
              className="geo-checkbox" />
          </td>
          <td>
            <input type="checkbox"
              className="geo-checkbox" />
          </td>
        </tr>
      );
    }

    let { title, valuation, video,
          description, plan_pdf, icon } = this.state;

    return (
      <form className="form-box">
        <input type="text"
          placeholder="#| project title"
          value={title}
          className="project-title-input"
          onChange={this.update('title')} />
        <div className="valuation-container">
          <input type="text"
            placeholder="#| valuation"
            value={valuation}
            className="valuation-input"
            onChange={this.update('valuation')} />
          <div className="coin-count">****</div>
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
            <tr>
              <td>
                <input id="fin-file"
                  name="fin-file"
                  className="file-input"
                  type="file" />
                <label htmlFor="fin-file">
                  <span>choose csv</span>
                </label>
              </td>
              <td className="file-title">financials</td>
            </tr>
            <tr>
              <td>
                <input id="plan-file"
                  name="plan-file"
                  className="file-input"
                  type="file"
                  onChange={this.updateFile} />
                <label htmlFor="plan-file">
                  <span>choose a pdf</span>
                </label>
              </td>
              <td className="file-title">plan</td>
            </tr>
          </tbody>
        </table>

        <div className="link-upload-cont">
          <input type="text"
            placeholder="paste video url here"
            value={video}
            className="link-input"
            onChange={this.update('video')} />
        </div>

        <div className="link-upload-cont">
          <input type="text"
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
