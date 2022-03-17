/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import React from "react";
import PropTypes from "prop-types";
import Icon from "../../../Common/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import {withAdminAccountRecovery} from "../../../../contexts/AdminAccountRecoveryContext";
import {withWorkflow} from "../../../../contexts/WorkflowContext";
import HandleSaveAccountRecoveryOrganizationPolicyWorkflow
  from "../../HandleSaveAccountRecoveryOrganizationPolicyWorkflow/HandleSaveAccountRecoveryOrganizationPolicyWorkflow";

/**
 * This component is a container of multiple actions applicable on setting
 */
class DisplayAdministrationWorkspaceActions extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleEditSubscriptionClick = this.handleEditSubscriptionClick.bind(this);
  }

  /**
   * Handle save settings
   */
  handleSaveClick() {
    this.props.workflowContext.start(HandleSaveAccountRecoveryOrganizationPolicyWorkflow, {});
  }

  /**
   * Handle reset account recovery policy settings
   */
  handleEditSubscriptionClick() {
    this.props.adminAccountRecoveryContext.resetChanges();
  }

  /**
   * Is save button enable
   */
  isSaveEnabled() {
    return this.props.adminAccountRecoveryContext.hasPolicyChanges();
  }

  /**
   * Is save button enable
   */
  isResetEnabled() {
    return this.props.adminAccountRecoveryContext.hasPolicyChanges();
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
      <div className="col2_3 actions-wrapper">
        <div className="actions">
          <div>
            <li>
              <a className={`button ${this.isSaveEnabled() ? "" : "disabled"}`} onClick={this.handleSaveClick}>
                <Icon name="save"/>
                <span><Trans>Save settings</Trans></span>
              </a>
            </li>
          </div>
          <div>
            <li>
              <a className={`button ${this.isResetEnabled() ? "" : "disabled"}`} onClick={this.handleEditSubscriptionClick}>
                <Icon name="edit"/>
                <span><Trans>Reset settings</Trans></span>
              </a>
            </li>
          </div>
        </div>
      </div>
    );
  }
}

DisplayAdministrationWorkspaceActions.propTypes = {
  adminAccountRecoveryContext: PropTypes.object, // The admin account recovery context
  workflowContext: PropTypes.any, // the workflow context
  t: PropTypes.func, // The translation function
};

export default withWorkflow(withAdminAccountRecovery(withTranslation('common')(DisplayAdministrationWorkspaceActions)));
