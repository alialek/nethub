import MainPanel from "../panels/MainPanel";

import React from "react";
import { View } from "@vkontakte/vkui";
import { PANEL_CATEGORY, PANEL_MAIN } from "./../router";
import CategoryPanel from "../panels/CategoryPanel";

const Main = ({ id, popout, modal, activePanel }) => {
  return (
    <View id={id} popout={popout} modal={modal} activePanel={activePanel}>
      <MainPanel id={PANEL_MAIN} />
      <CategoryPanel id={PANEL_CATEGORY} />
    </View>
  );
};

export default Main;
