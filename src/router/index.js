import { Page, Router } from "@happysanta/router";

export const PAGE_MAIN = "/";
export const PAGE_CATEGORY = "/category/:id([0-9]+)";

export const PANEL_MAIN = "panel_main";
export const PANEL_CATEGORY = "panel_category";

export const VIEW_MAIN = "view_main";
export const VIEW_CATEGORY = "view_category";

//Если используется App без Epic
export const PAGE_INTRO = "/intro";
export const PANEL_INTRO = "panel_intro";
export const VIEW_INTRO = "view_intro";

export const MODAL_ABOUT = "modal_about";
export const MODAL_INSTRUCTION = "modal_history";
export const MODAL_ROOM = "room";

export const POPOUT_CONFIRM = "popout_confirm";
export const POPOUT_SPINNER = "popout_spinner";

const routes = {
  [PAGE_MAIN]: new Page(PANEL_MAIN, VIEW_MAIN),
  [PAGE_CATEGORY]: new Page(PANEL_CATEGORY, VIEW_MAIN),
};

export const router = new Router(routes);

router.start();
