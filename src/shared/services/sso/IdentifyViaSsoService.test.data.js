/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.12.0
 */
import {ApiClientOptions} from "../../lib/apiClient/apiClientOptions";

export function defaultAppContext(context) {
  const apiClientOptions = new ApiClientOptions()
    .setBaseUrl("http://localhost:6006");

  const defaultAppContext = {
    getApiClientOptions: () => apiClientOptions
  };
  return Object.assign(defaultAppContext, context || {});
}
