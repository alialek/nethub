import React from "react";
import { Snackbar } from "@vkontakte/vkui";
/**
 *
 * @param {JSX.Element} icon
 * @param {String} text
 * @param {Function} closeEvent
 */
const showSnackbar = (icon, text, closeEvent) => (
  <Snackbar
    action="Close"
    onActionClick={closeEvent}
    onClose={closeEvent}
    duration={2000}
    before={icon}
  >
    {text}
  </Snackbar>
);

export default showSnackbar;
