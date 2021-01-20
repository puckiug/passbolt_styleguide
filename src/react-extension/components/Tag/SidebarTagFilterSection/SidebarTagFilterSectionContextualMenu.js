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
 * @since         2.13.0
 */
import React from "react";
import PropTypes from "prop-types";
import ContextualMenuWrapper from "../../../../react/components/Common/ContextualMenu/ContextualMenuWrapper";
import {filterByTagsOptions} from "./DisplayTagList";

class SidebarTagFilterSectionContextualMenu extends React.Component {
  /**
   * Constructor
   * Initialize state and bind methods
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFilterClickEvent = this.handleFilterClickEvent.bind(this);
  }

  /**
   * Handle click on the filter type menu option.
   * @param {string} filterType
   */
  handleFilterClickEvent(filterType) {
    this.props.onFilterSelected(filterType);
    this.props.hide();
  }

  /**
   * Render the component.
   * @returns {JSX}
   */
  render() {
    return (
      <ContextualMenuWrapper
        hide={this.props.hide}
        left={this.props.left}
        top={this.props.top}>
        <li key="option-filter-all-tag" className="ready closed">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="all-tag" onClick={() => this.handleFilterClickEvent(filterByTagsOptions.all)}><span>All tags</span></a>
              </div>
            </div>
          </div>
        </li>
        <li key="option-filter-personal-tag" className="ready closed">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="personal-tag" onClick={() => this.handleFilterClickEvent(filterByTagsOptions.personal)}><span>My tags</span></a>
              </div>
            </div>
          </div>
        </li>
        <li key="option-filter-share-tag" className="ready closed">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a id="shared-tag" onClick={() => this.handleFilterClickEvent(filterByTagsOptions.shared)}><span>Shared tags</span></a>
              </div>
            </div>
          </div>
        </li>
      </ContextualMenuWrapper>
    );
  }
}

SidebarTagFilterSectionContextualMenu.propTypes = {
  onFilterSelected: PropTypes.func,
  left: PropTypes.number, // left position in px of the menu
  hide: PropTypes.func, // Hide the contextual menu
  top: PropTypes.number // top position in px of the menu
};

export default SidebarTagFilterSectionContextualMenu;
