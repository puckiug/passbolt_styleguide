/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.6.1
 */

import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../shared/components/Icons/Icon";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import {withPrepareResourceContext} from "../../contexts/PrepareResourceContext";
import {withPasswordExpiry} from "../../../react-extension/contexts/PasswordExpirySettingsContext";
import {withPasswordPolicies} from "../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";

/**
 * The component display error variations.
 * @type {Object}
 */
export const ConfirmCreatePageRuleVariations = {
  IN_DICTIONARY: 'In dictionary',
  MINIMUM_ENTROPY: 'Minimum entropy'
};

class ConfirmCreatePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.initEventHandlers();
  }

  /**
   * Get the default state
   * @returns {object}
   */
  getDefaultState() {
    return {
      error: "",
      processing: false,
    };
  }

  /**
   * initialize event handlers
   * @returns {void}
   */
  initEventHandlers() {
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
  }

  /**
   * Handles click on the `go back` button and cancel button
   * @param {React.Event} event
   */
  handleGoBackClick(event) {
    event.preventDefault();
    // Caution: Hack to notify the previous component that the resource is part of a dictionary, it does not handle previous page original state.
    const backPath = "/webAccessibleResources/quickaccess/resources/create";
    const additionalState = {passwordInDictionary: true};
    this.props.history.replace({pathname: backPath, state: additionalState});
    this.props.history.goBack();
  }
  /**
   * Handles the click on the "x" button
   * @param {React.Event} event
   */
  handleConfirmClick(event) {
    // Prevent submit default behavior.
    event.preventDefault();
    this.save();
  }

  /**
   * Save the resource
   * @returns {Promise<void>}
   */
  async save() {
    const preparedResource = this.props.prepareResourceContext.consumePreparedResource();
    const resourceDto = {
      name: preparedResource.name,
      username: preparedResource.username,
      uri: preparedResource.uri,
      resource_type_id: this.props.context.resourceTypesSettings.findResourceTypeIdBySlug(
        this.props.context.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_AND_DESCRIPTION),
      expired: this.props.passwordExpiryContext.getDefaultExpirationDate(),
    };
    const secretDto = {
      password: preparedResource.password,
      description: ""
    };

    this.setState({processing: true});
    try {
      const resource = await this.props.context.port.request("passbolt.resources.create", resourceDto, secretDto);
      /*
       * Remove the confirmation and create step from the history.
       * The user needs to be redirected to the home page and not the create page while clicking on go back
       * password details page.
       */
      const goToComponentState = {
        goBackEntriesCount: -3
      };
      this.props.prepareResourceContext.resetSecretGeneratorSettings();
      this.props.history.push(`/webAccessibleResources/quickaccess/resources/view/${resource.id}`, goToComponentState);
    } catch (error) {
      this.handleSubmitError(error);
    }
  }

  /**
   * Handles error during form submission
   * @param {Error} error
   */
  handleSubmitError(error) {
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
    } else {
      // An unexpected error occurred.
      this.setState({
        error: error.message,
        processing: false
      });
    }
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  render() {
    return (
      <div className="confirm-create">
        <div className="back-link">
          <a href="#" className="primary-action" onClick={this.handleGoBackClick} title={this.translate("Edit password")}>
            <Icon name="chevron-left"/>
            <span className="primary-action-title"><Trans>Confirm password creation</Trans></span>
          </a>
          <a href="#" className="secondary-action button-transparent button" onClick={this.handleGoBackClick} title={this.translate("Reject")}>
            <Icon name="close"/>
            <span className="visually-hidden"><Trans>Reject</Trans></span>
          </a>
        </div>
        <div className="form-container">
          <p>
            {{
              [ConfirmCreatePageRuleVariations.IN_DICTIONARY]: <Trans>The password is part of an exposed data breach.</Trans>,
              [ConfirmCreatePageRuleVariations.MINIMUM_ENTROPY]: <Trans>The password is very weak and might be part of an exposed data breach.</Trans>,
            }[this.props.location.state.rule]}
          </p>
          <p>
            <Trans>
              Are you sure you want to create the resource <strong>{{resourceName: this.props.location.state.resourceName}}</strong>?
            </Trans>
          </p>
        </div>
        <div className="submit-wrapper input">
          <button type="button" onClick={this.handleConfirmClick}
            className={`button primary attention big full-width ${this.state.processing ? "processing" : ""}`}
            role="button" disabled={this.state.processing}>
            <Trans>Proceed anyway</Trans>
            {this.state.processing &&
              <Icon name="spinner"/>
            }
          </button>
          {this.state.error &&
            <div className="error-message">{this.state.error}</div>
          }
        </div>
      </div>
    );
  }
}

ConfirmCreatePage.propTypes = {
  context: PropTypes.any, // The application context
  prepareResourceContext: PropTypes.any, // The password generator context
  passwordExpiryContext: PropTypes.object, // The password expiry context
  // Match, location and history props are injected by the withRouter decoration call.
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withPrepareResourceContext(withPasswordExpiry(withPasswordPolicies(withTranslation('common')(ConfirmCreatePage))))));
