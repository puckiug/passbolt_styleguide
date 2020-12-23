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
 * @since         3.0.0
 */
import React, {Component} from "react";
import AppContext from "./contexts/AppContext";
import ApiSetupContextProvider from "./contexts/ApiSetupContext";
import {ApiClientOptions} from "./lib/apiClient/apiClientOptions";
import OrchestrateApiSetup from "./components/AuthenticationSetup/OrchestrateApiSetup/OrchestrateApiSetup";

/**
 * The setup application served by the API.
 */
class ApiSetup extends Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.userId = null; // The setup user id
    this.token = null; // The setup token
    this.initializeProperties();
  }

  /**
   * Returns the component default state
   * @return {object}
   */
  get defaultState() {
    return {
      trustedDomain: this.baseUrl, // The site domain (use trusted domain for compatibility with browser extension applications)
      getApiClientOptions: this.getApiClientOptions.bind(this), // Get the api client options
    };
  }

  /**
   * Initialize properties
   */
  initializeProperties() {
    const uuidRegex = "[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[0-5][a-fA-F0-9]{3}-[089aAbB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}";
    const setupBootstrapRegex = `setup\/install\/(${uuidRegex})\/(${uuidRegex})$`;
    const regex = new RegExp(setupBootstrapRegex);
    const match = window.location.pathname.match(regex);
    if (!match) {
      console.error("Unable to retrieve the user id and token from the url");
      return;
    }
    this.userId = match[1];
    this.token = match[2];
  }

  /**
   * Get the application base url
   * @return {string}
   */
  get baseUrl() {
    const baseElement = document.getElementsByTagName('base') && document.getElementsByTagName('base')[0];
    if (baseElement) {
      return baseElement.attributes.href.value.replace(/\/*$/g, '');
    }
    console.error("Unable to retrieve the page base tag");
    return "";
  }

  /**
   * Get the API client options
   * @returns {ApiClientOptions}
   */
  getApiClientOptions() {
    return new ApiClientOptions()
      .setBaseUrl(this.state.trustedDomain);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div id="container" className="container page login">
          <div className="content">
            <div className="header">
              <div className="logo"><span className="visually-hidden">Passbolt</span></div>
            </div>
            <div className="login-form">
              <ApiSetupContextProvider value={{userId: this.userId, token: this.token}}>
                <OrchestrateApiSetup/>
              </ApiSetupContextProvider>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default ApiSetup;
