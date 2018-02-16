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

    let { title, valuation, video,
          description, plan_pdf, icon} = this.state;

    return(
      <form className="form-box">
        <input
          type="text"
          placeholder="#| project title"
          value={title}
          className="project-title-input"
          onChange={this.update('title')}
          />
        <div className="valuation-container">
          <input
            type="text"
            placeholder="#| valuation"
            value={ valuation }
            className="valuation-input"
            onChange={this.update('valuation')}
            />
          <div className="coin-count">30000</div>
          <div className="coin-text">coins to be issued</div>
        </div>

        <hr/>

        <div className="video-div upload-cont">
          <input
            type="text"
            placeholder="paste video url here"
            value={video}
            className="video-input"
            onChange={this.update('video')} />
        </div>

        <div className="icon-div upload-cont">
          <input
            type="text"
            placeholder="paste icon image url here"
            value={icon}
            className="icon-input"
            onChange={this.update('icon')} />
        </div>


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
      </form>
    );
  }
}

export default ProjectForm;
