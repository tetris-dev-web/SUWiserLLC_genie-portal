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
      video: '',
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

    if (file) formData.append("project[file]", file);

    formData.append("project[title]", this.state.title);
    formData.append("project[revenue]", this.state.revenue);
    formData.append("project[valuation]", this.state.valuation);
    formData.append("project[video]", this.state.video);
    formData.append("project[city]", this.state.city);
    formData.append("project[country]", this.state.country);
    formData.append("project[continent]", this.state.continent);
    formData.append("project[icon]", this.state.icon);
    formData.append("project[description]", this.state.description);
    formData.append("project[creator_id]", this.state.creator_id);
    formData.append("project[status]", this.state.status);

    // this.props.contract.mint(this.props.account, 3000, {from:this.props.account});

    this.props.createProject(formData).then( () => {
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

    let { title, revenue, valuation, description, video, city, country, continent, icon } = this.state;

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
        <select className="main-input country-input"
          placeholder="#| country"
          value={country}
          onChange={this.update('country')}>
            <option value="" disabled>Country</option>
            <option value="AF">Afghanistan</option>
          	<option value="AX">Åland Islands</option>
          	<option value="AL">Albania</option>
          	<option value="DZ">Algeria</option>
          	<option value="AS">American Samoa</option>
          	<option value="AD">Andorra</option>
          	<option value="AO">Angola</option>
          	<option value="AI">Anguilla</option>
          	<option value="AQ">Antarctica</option>
          	<option value="AG">Antigua and Barbuda</option>
          	<option value="AR">Argentina</option>
          	<option value="AM">Armenia</option>
          	<option value="AW">Aruba</option>
          	<option value="AU">Australia</option>
          	<option value="AT">Austria</option>
          	<option value="AZ">Azerbaijan</option>
          	<option value="BS">Bahamas</option>
          	<option value="BH">Bahrain</option>
          	<option value="BD">Bangladesh</option>
          	<option value="BB">Barbados</option>
          	<option value="BY">Belarus</option>
          	<option value="BE">Belgium</option>
          	<option value="BZ">Belize</option>
          	<option value="BJ">Benin</option>
          	<option value="BM">Bermuda</option>
          	<option value="BT">Bhutan</option>
          	<option value="BO">Bolivia, Plurinational State of</option>
          	<option value="BQ">Bonaire, Sint Eustatius and Saba</option>
          	<option value="BA">Bosnia and Herzegovina</option>
          	<option value="BW">Botswana</option>
          	<option value="BV">Bouvet Island</option>
          	<option value="BR">Brazil</option>
          	<option value="IO">British Indian Ocean Territory</option>
          	<option value="BN">Brunei Darussalam</option>
          	<option value="BG">Bulgaria</option>
          	<option value="BF">Burkina Faso</option>
          	<option value="BI">Burundi</option>
          	<option value="KH">Cambodia</option>
          	<option value="CM">Cameroon</option>
          	<option value="CA">Canada</option>
          	<option value="CV">Cape Verde</option>
          	<option value="KY">Cayman Islands</option>
          	<option value="CF">Central African Republic</option>
          	<option value="TD">Chad</option>
          	<option value="CL">Chile</option>
          	<option value="CN">China</option>
          	<option value="CX">Christmas Island</option>
          	<option value="CC">Cocos (Keeling) Islands</option>
          	<option value="CO">Colombia</option>
          	<option value="KM">Comoros</option>
          	<option value="CG">Congo</option>
          	<option value="CD">Congo, the Democratic Republic of the</option>
          	<option value="CK">Cook Islands</option>
          	<option value="CR">Costa Rica</option>
          	<option value="CI">Côte d'Ivoire</option>
          	<option value="HR">Croatia</option>
          	<option value="CU">Cuba</option>
          	<option value="CW">Curaçao</option>
          	<option value="CY">Cyprus</option>
          	<option value="CZ">Czech Republic</option>
          	<option value="DK">Denmark</option>
          	<option value="DJ">Djibouti</option>
          	<option value="DM">Dominica</option>
          	<option value="DO">Dominican Republic</option>
          	<option value="EC">Ecuador</option>
          	<option value="EG">Egypt</option>
          	<option value="SV">El Salvador</option>
          	<option value="GQ">Equatorial Guinea</option>
          	<option value="ER">Eritrea</option>
          	<option value="EE">Estonia</option>
          	<option value="ET">Ethiopia</option>
          	<option value="FK">Falkland Islands (Malvinas)</option>
          	<option value="FO">Faroe Islands</option>
          	<option value="FJ">Fiji</option>
          	<option value="FI">Finland</option>
          	<option value="FR">France</option>
          	<option value="GF">French Guiana</option>
          	<option value="PF">French Polynesia</option>
          	<option value="TF">French Southern Territories</option>
          	<option value="GA">Gabon</option>
          	<option value="GM">Gambia</option>
          	<option value="GE">Georgia</option>
          	<option value="DE">Germany</option>
          	<option value="GH">Ghana</option>
          	<option value="GI">Gibraltar</option>
          	<option value="GR">Greece</option>
          	<option value="GL">Greenland</option>
          	<option value="GD">Grenada</option>
          	<option value="GP">Guadeloupe</option>
          	<option value="GU">Guam</option>
          	<option value="GT">Guatemala</option>
          	<option value="GG">Guernsey</option>
          	<option value="GN">Guinea</option>
          	<option value="GW">Guinea-Bissau</option>
          	<option value="GY">Guyana</option>
          	<option value="HT">Haiti</option>
          	<option value="HM">Heard Island and McDonald Islands</option>
          	<option value="VA">Holy See (Vatican City State)</option>
          	<option value="HN">Honduras</option>
          	<option value="HK">Hong Kong</option>
          	<option value="HU">Hungary</option>
          	<option value="IS">Iceland</option>
          	<option value="IN">India</option>
          	<option value="ID">Indonesia</option>
          	<option value="IR">Iran, Islamic Republic of</option>
          	<option value="IQ">Iraq</option>
          	<option value="IE">Ireland</option>
          	<option value="IM">Isle of Man</option>
          	<option value="IL">Israel</option>
          	<option value="IT">Italy</option>
          	<option value="JM">Jamaica</option>
          	<option value="JP">Japan</option>
          	<option value="JE">Jersey</option>
          	<option value="JO">Jordan</option>
          	<option value="KZ">Kazakhstan</option>
          	<option value="KE">Kenya</option>
          	<option value="KI">Kiribati</option>
          	<option value="KP">Korea, Democratic People's Republic of</option>
          	<option value="KR">Korea, Republic of</option>
          	<option value="KW">Kuwait</option>
          	<option value="KG">Kyrgyzstan</option>
          	<option value="LA">Lao People's Democratic Republic</option>
          	<option value="LV">Latvia</option>
          	<option value="LB">Lebanon</option>
          	<option value="LS">Lesotho</option>
          	<option value="LR">Liberia</option>
          	<option value="LY">Libya</option>
          	<option value="LI">Liechtenstein</option>
          	<option value="LT">Lithuania</option>
          	<option value="LU">Luxembourg</option>
          	<option value="MO">Macao</option>
          	<option value="MK">Macedonia, the former Yugoslav Republic of</option>
          	<option value="MG">Madagascar</option>
          	<option value="MW">Malawi</option>
          	<option value="MY">Malaysia</option>
          	<option value="MV">Maldives</option>
          	<option value="ML">Mali</option>
          	<option value="MT">Malta</option>
          	<option value="MH">Marshall Islands</option>
          	<option value="MQ">Martinique</option>
          	<option value="MR">Mauritania</option>
          	<option value="MU">Mauritius</option>
          	<option value="YT">Mayotte</option>
          	<option value="MX">Mexico</option>
          	<option value="FM">Micronesia, Federated States of</option>
          	<option value="MD">Moldova, Republic of</option>
          	<option value="MC">Monaco</option>
          	<option value="MN">Mongolia</option>
          	<option value="ME">Montenegro</option>
          	<option value="MS">Montserrat</option>
          	<option value="MA">Morocco</option>
          	<option value="MZ">Mozambique</option>
          	<option value="MM">Myanmar</option>
          	<option value="NA">Namibia</option>
          	<option value="NR">Nauru</option>
          	<option value="NP">Nepal</option>
          	<option value="NL">Netherlands</option>
          	<option value="NC">New Caledonia</option>
          	<option value="NZ">New Zealand</option>
          	<option value="NI">Nicaragua</option>
          	<option value="NE">Niger</option>
          	<option value="NG">Nigeria</option>
          	<option value="NU">Niue</option>
          	<option value="NF">Norfolk Island</option>
          	<option value="MP">Northern Mariana Islands</option>
          	<option value="NO">Norway</option>
          	<option value="OM">Oman</option>
          	<option value="PK">Pakistan</option>
          	<option value="PW">Palau</option>
          	<option value="PS">Palestinian Territory, Occupied</option>
          	<option value="PA">Panama</option>
          	<option value="PG">Papua New Guinea</option>
          	<option value="PY">Paraguay</option>
          	<option value="PE">Peru</option>
          	<option value="PH">Philippines</option>
          	<option value="PN">Pitcairn</option>
          	<option value="PL">Poland</option>
          	<option value="PT">Portugal</option>
          	<option value="PR">Puerto Rico</option>
          	<option value="QA">Qatar</option>
          	<option value="RE">Réunion</option>
          	<option value="RO">Romania</option>
          	<option value="RU">Russian Federation</option>
          	<option value="RW">Rwanda</option>
          	<option value="BL">Saint Barthélemy</option>
          	<option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
          	<option value="KN">Saint Kitts and Nevis</option>
          	<option value="LC">Saint Lucia</option>
          	<option value="MF">Saint Martin (French part)</option>
          	<option value="PM">Saint Pierre and Miquelon</option>
          	<option value="VC">Saint Vincent and the Grenadines</option>
          	<option value="WS">Samoa</option>
          	<option value="SM">San Marino</option>
          	<option value="ST">Sao Tome and Principe</option>
          	<option value="SA">Saudi Arabia</option>
          	<option value="SN">Senegal</option>
          	<option value="RS">Serbia</option>
          	<option value="SC">Seychelles</option>
          	<option value="SL">Sierra Leone</option>
          	<option value="SG">Singapore</option>
          	<option value="SX">Sint Maarten (Dutch part)</option>
          	<option value="SK">Slovakia</option>
          	<option value="SI">Slovenia</option>
          	<option value="SB">Solomon Islands</option>
          	<option value="SO">Somalia</option>
          	<option value="ZA">South Africa</option>
          	<option value="GS">South Georgia and the South Sandwich Islands</option>
          	<option value="SS">South Sudan</option>
          	<option value="ES">Spain</option>
          	<option value="LK">Sri Lanka</option>
          	<option value="SD">Sudan</option>
          	<option value="SR">Suriname</option>
          	<option value="SJ">Svalbard and Jan Mayen</option>
          	<option value="SZ">Swaziland</option>
          	<option value="SE">Sweden</option>
          	<option value="CH">Switzerland</option>
          	<option value="SY">Syrian Arab Republic</option>
          	<option value="TW">Taiwan, Province of China</option>
          	<option value="TJ">Tajikistan</option>
          	<option value="TZ">Tanzania, United Republic of</option>
          	<option value="TH">Thailand</option>
          	<option value="TL">Timor-Leste</option>
          	<option value="TG">Togo</option>
          	<option value="TK">Tokelau</option>
          	<option value="TO">Tonga</option>
          	<option value="TT">Trinidad and Tobago</option>
          	<option value="TN">Tunisia</option>
          	<option value="TR">Turkey</option>
          	<option value="TM">Turkmenistan</option>
          	<option value="TC">Turks and Caicos Islands</option>
          	<option value="TV">Tuvalu</option>
          	<option value="UG">Uganda</option>
          	<option value="UA">Ukraine</option>
          	<option value="AE">United Arab Emirates</option>
          	<option value="GB">United Kingdom</option>
          	<option value="US">United States</option>
          	<option value="UM">United States Minor Outlying Islands</option>
          	<option value="UY">Uruguay</option>
          	<option value="UZ">Uzbekistan</option>
          	<option value="VU">Vanuatu</option>
          	<option value="VE">Venezuela, Bolivarian Republic of</option>
          	<option value="VN">Viet Nam</option>
          	<option value="VG">Virgin Islands, British</option>
          	<option value="VI">Virgin Islands, U.S.</option>
          	<option value="WF">Wallis and Futuna</option>
          	<option value="EH">Western Sahara</option>
          	<option value="YE">Yemen</option>
          	<option value="ZM">Zambia</option>
          	<option value="ZW">Zimbabwe</option>
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
