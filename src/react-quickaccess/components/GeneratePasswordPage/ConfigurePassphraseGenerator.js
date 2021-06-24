/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.4.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";

class ConfigurePassphraseGenerator extends Component {
  constructor(props) {
    super(props);
    this.initEventHandlers();
  }

  initEventHandlers() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleWordCountChange = this.handleWordCountChange.bind(this);
  }

  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const configuration = {...this.state.configuration};
    configuration.default_options[name] = value;

    this.setState({configuration});
    this.props.onChanged(configuration);
  }

  /**
   * Handle form word count input change.
   * @params {ReactEvent} The react event.
   */
  handleWordCountChange(event) {
    const configuration = {...this.state.configuration};
    configuration.default_options.word_count = event.target.value;

    this.setState({configuration});
    this.props.onChanged(configuration);
  }

  /**
   * Returns the current number of words option
   * @return {{default: number, min: number, max: number}}
   */
  get numberOfWords() {
    const {default_options} = this.state.configuration;
    return {
      default: default_options.word_count,
      min: default_options.min_word,
      max: default_options.max_word,
    };
  }

  /**
   * Returns the current separator option
   * @returns {string}
   */
  get separator() {
    return this.state.configuration.default_options.separator;
  }

  /**
   * Returns the current word case option
   * @returns {string}
   */
  get wordCase() {
    return this.state.configuration.default_options.word_case;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <>
        <div className="input text">
          <label htmlFor="configure-passphrase-generator-form-word-count"><Trans>Number of words</Trans></label>
          <div className="slider">
            <input
              name="word_count"
              min="4"
              max="8"
              value="5"
              type="range"
              onChange={this.handleInputChange}/>
            <input
              type="number"
              id="configure-passphrase-generator-form-word-count"
              name="word_count"
              min="4"
              max="8"
              value="5"
              onChange={this.handleWordCountChange}/>
          </div>
        </div>
        <div className="input text">
          <label htmlFor="configure-passphrase-generator-form-words-separator"><Trans>Words separator</Trans></label>
          <input
            id="configure-passphrase-generator-form-words-separator"
            type="text"
            name="separator"
            value="-"
            onChange={this.handleInputChange}
            placeholder={this.translate("Type one or more characters")}/>
        </div>
        <div className="input select">
          <label htmlFor="configure-passphrase-generator-form-words-case"><Trans>Words case</Trans></label>
          <select id="configure-passphrase-generator-form-words-case" name="word_case" value="lowercase" onChange={this.handleInputChange}>
            <option key="lowercase" value="lowercase">{this.translate("Lower case")}</option>
            <option key="uppercase" value="uppercase">{this.translate("Upper case")}</option>
            <option key="camelcase" value="camelcase">{this.translate("Camel case")}</option>
          </select>
        </div>
      </>
    );
  }
}

ConfigurePassphraseGenerator.propTypes = {
  configuration: PropTypes.object, // The default generator configuration
  onChanged: PropTypes.func, // Called whenever the generator configuration changed
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(ConfigurePassphraseGenerator);
