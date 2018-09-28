import React from 'react';
import { totalData } from '../../../../util/token_data_util';
import { roundToTwo } from '../../../../util/function_util';

class ProjectForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      revenue: '',
      valuation: '',
      model_link: '',
      city: '',
      country: '',
      continent: '',
      icon: '',
      description: '',
      creator_id: props.currentUser.id,
      imageFile: '',
      imageUrl: '',
      coins: '****',
      status: 'pitched',
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

    const file = this.state.imageFile;
    const formData = new FormData();
    const {drizzle, drizzleState} = this.props;
    const GNITokenCrowdsale = drizzle.contracts.GNITokenCrowdsale;

    if (file) formData.append("project[file]", file);

    formData.append("project[title]", this.state.title);
    formData.append("project[revenue]", this.state.revenue);
    formData.append("project[valuation]", this.state.valuation);
    formData.append("project[model_link]", this.state.model_link);
    formData.append("project[city]", this.state.city);
    formData.append("project[country]", this.state.country);
    formData.append("project[continent]", this.state.continent);
    formData.append("project[icon]", this.state.icon);
    formData.append("project[description]", this.state.description);
    formData.append("project[creator_id]", this.state.creator_id);
    formData.append("project[status]", this.state.status);

    this.props.createProject(formData).then( () => {
      const pitchedProject = GNITokenCrowdsale.methods.pitchProjectandRaiseCap.cacheSend(this.state.valuation, { from: drizzleState.accounts[0] });
      this.props.closeModal();
      location.reload();
    });

  }

  update(property) {
    return (e) => {
      this.setState({ [property]: e.currentTarget.value });

      const { revenue } = this.state;
      const price = 70;
      const coins = roundToTwo(revenue / price);

      if (revenue || revenue > 0) {
        this.setState({ coins });
      } else {
        this.setState({ coins: '****' });
      }
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
      this.setState({ imageUrl: '', imageFile: null });
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
        <div className="geo-row-container" key={i}>
          <div className="file-container">
            <input id={fileId[i]}
              name={fileId[i]}
              className="file-input"
              type="file" />
            <label htmlFor={fileId[i]}>
              <span>choose geojson</span>
            </label>
          </div>
          <select className="heir-input">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <input className="opacity-input"
            type="number"
            min="0"
            max="1"
            placeholder="0.5" />
        </div>
      );
    }

    let { title, revenue, valuation, description, model_link, city, country, continent, icon } = this.state;

    return (
      <form className="form-box p-form-box">
        <input className="main-input project-title-input"
          type="text"
          placeholder="#| project title"
          value={title}
          onChange={this.update('title')} />
        <select className="main-input continent-input"
          value={continent}
          onChange={this.update('continent')}>
            <option value="" disabled>Continent</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Australia">Australia</option>
        </select>
        <input className="main-input city-input"
          type="text"
          placeholder="#| city"
          value={city}
          onChange={this.update('city')} />
        <input className="main-input revenue-input"
          type="number"
          placeholder="#| revenue"
          value={revenue}
          onChange={this.update('revenue')} />
        <div className="valuation-container">
          <input className="valuation-input"
            type="number"
            placeholder="#| valuation"
            value={valuation}
            onChange={this.update('valuation')} />
          <div className="coin-count">{this.state.coins}</div>
          <div className="coin-text">coins to be issued</div>
        </div>

        <hr className="project-divider" />

        <div className="geo-container">
          <header className="geo-row-container">
            <h5>spatial overlays</h5>
            <h5>hierarchy</h5>
            <h5>opacity</h5>
          </header>
          {geojsons}
        </div>

        <hr className="project-divider" />

        <div className="fin-plan-container">
          <div className="file-container">
            <input id="fin-file"
              name="fin-file"
              className="file-input"
              type="file" />
            <label htmlFor="fin-file">
              <span>choose csv</span>
            </label>
          </div>
          <h5>financials</h5>
          <div className="file-container">
            <input id="plan-file"
              name="plan-file"
              className="file-input"
              type="file"
              multiple
              onChange={this.updateFile} />
            <label htmlFor="plan-file">
              <span>choose a pdf</span>
            </label>
          </div>
          <h5>plan</h5>
        </div>

        <div className="link-upload-cont">
          <input type="text"
            placeholder="paste model link url here"
            value={model_link}
            className="link-input"
            onChange={this.update('model_link')} />
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
          <textarea
            value={ description }
            className="p-form-description"
            onChange={this.update('description')} />
        </label>
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
