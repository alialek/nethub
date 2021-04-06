import React, { useCallback } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  ConfigProvider,
  ScreenSpinner,
  Root,
  ModalRoot,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Main from "./views/MainView";
import {
  VIEW_MAIN,
  MODAL_ABOUT,
  POPOUT_CONFIRM,
  POPOUT_SPINNER,
  MODAL_ROOM,
} from "./router";
import "./App.css";
import { useLocation, useRouter } from "@happysanta/router";
import Confirm from "./components/ConfirmationPopout";
import AboutModalCard from "./components/AboutModalCard";
import {
  getActiveRoom,
  getHome,
  setIsNotificationsEnabled,
} from "./store/data/actions";
import RoomModalCard from "./components/RoomModalCard";

const App = ({ colorScheme, snackbar }) => {
  const router = useRouter();
  const location = useLocation();
  const popout = (() => {
    if (location.getPopupId() === POPOUT_CONFIRM) {
      return <Confirm />;
    } else if (location.getPopupId() === POPOUT_SPINNER) {
      return <ScreenSpinner />;
    }
  })();

  const modal = (
    <ModalRoot
      onClose={() => router.replaceModal(null)}
      activeModal={location.getModalId()}
    >
      <AboutModalCard id={MODAL_ABOUT} />
      <RoomModalCard id={MODAL_ROOM} />
    </ModalRoot>
  );
  return (
    <ConfigProvider isWebView={true} scheme={colorScheme}>
      <Root activeView={location.getViewId()}>
        <Main
          activePanel={location.getViewActivePanel(VIEW_MAIN)}
          history={location.getViewHistory(VIEW_MAIN)}
          id={VIEW_MAIN}
          modal={modal}
          popout={popout}
          snackbar={snackbar}
        />
      </Root>
      {snackbar}
    </ConfigProvider>
  );
};
const mapStateToProps = (state) => {
  return {
    colorScheme: state.data.colorScheme,
    snackbar: state.data.snackbar,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators(
      { setIsNotificationsEnabled, getHome, getActiveRoom },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
