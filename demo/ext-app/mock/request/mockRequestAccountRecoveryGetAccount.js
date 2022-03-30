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

export default () => {
  return {
    "domain": "http://localhost:3000",
    "security_token": {
      "code": "HGA",
      "color": "#8bc34a",
      "textcolor": "#000000",
    },
    "user": {
      "id": "f848277c-5398-58f8-a82a-72397af2d450",
      "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
      "username": "ada@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-08-13T10:10:02+00:00",
      "modified": "2020-09-13T10:10:02+00:00",
      "role": {
        "name": "admin",
      },
      "profile": {
        "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
        "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
        "first_name": "Ada",
        "last_name": "Lovelace",
        "created": "2020-10-13T10:10:02+00:00",
        "modified": "2020-10-13T10:10:02+00:00",
        "avatar": {
          "url": {
            "medium": "img/avatar/user_medium.png",
            "small": "img/avatar/user.png"
          }
        }
      },
    }
  };
};
