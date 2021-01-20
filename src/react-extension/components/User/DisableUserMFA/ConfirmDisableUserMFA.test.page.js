import {fireEvent, render, waitFor} from "@testing-library/react";
import AppContext from "../../../contexts/AppContext";
import DialogContextProvider from "../../../../react/contexts/Common/DialogContext";
import ManageDialogs from "../../../../react/components/Common/Dialog/ManageDialogs/ManageDialogs";
import React from "react";
import ConfirmDisableUserMFA from "./ConfirmDisableUserMFA";

/**
 * The ConfirmDisableUserMFATestPage component represented as a page
 */
export default class ConfirmDisableUserMFATestPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <AppContext.Provider value={appContext}>
        <DialogContextProvider>
          <ManageDialogs/>
          <ConfirmDisableUserMFA {...props}/>
        </DialogContextProvider>
      </AppContext.Provider>
    );
  }

  /**
   * Returns the confirm button element
   */
  get confirmButton() {
    return this._page.container.querySelector('.submit-wrapper input[type=\"submit\"]');
  }

  /**
   * Returns the confirm button element
   */
  get cancelButton() {
    return this._page.container.querySelector('.submit-wrapper .cancel');
  }


  /**
   * Confirms the user's MFA disable
   */
  async confirm() {
    const leftClick = {button: 0};
    fireEvent.click(this.confirmButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Confirms the user's MFA disable without React wait for
   */
  confirmWithoutWaitFor() {
    const leftClick = {button: 0};
    fireEvent.click(this.confirmButton, leftClick);
  }

  /**
   * Cancels the user's MFA disable
   */
  async cancel() {
    const leftClick = {button: 0};
    fireEvent.click(this.cancelButton, leftClick);
    await waitFor(() => {});
  }
}
