import {
  SET_COLOR_SCHEME,
  SET_SNACKBAR,
  SET_IS_NOTIFICATIONS_ENABLED,
  SET_IS_ONBOARDING_VIEWED,
  SET_HOME,
  SET_SEARCH,
  SET_ACTIVE_ROOM,
  SET_CATEGORY,
} from "./actionTypes.js";

import { category, home, search } from "../../api";
import { roomById } from "./../../api/rest/room";

export const setColorScheme = (inputData) => ({
  type: SET_COLOR_SCHEME,
  payload: {
    data: inputData,
  },
});
export const setActiveRoom = (inputData) => ({
  type: SET_ACTIVE_ROOM,
  payload: {
    data: inputData,
  },
});
export const setSnackbar = (inputData) => ({
  type: SET_SNACKBAR,
  payload: {
    data: inputData,
  },
});
export const setIsOnboardingViewed = (inputData) => ({
  type: SET_IS_ONBOARDING_VIEWED,
  payload: {
    data: inputData,
  },
});
export const setIsNotificationsEnabled = (inputData) => (dispatch) => ({
  type: SET_IS_NOTIFICATIONS_ENABLED,
  payload: {
    data: inputData,
  },
});

export const getActiveRoom = (id) => (dispatch) => {
  dispatch({
    type: SET_ACTIVE_ROOM,
    payload: {
      data: null,
    },
  });
  roomById(id)
    .then((res) => {
      dispatch({
        type: SET_ACTIVE_ROOM,
        payload: {
          data: res.data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ACTIVE_ROOM,
        payload: {
          data: "error",
        },
      });
    });
};

export const getCategory = (id) => (dispatch) => {
  dispatch({
    type: SET_CATEGORY,
    payload: {
      data: null,
    },
  });
  category(id)
    .then((res) => {
      dispatch({
        type: SET_CATEGORY,
        payload: {
          data: res.data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_CATEGORY,
        payload: {
          data: "error",
        },
      });
    });
};

export const getHome = () => (dispatch) => {
  dispatch({
    type: SET_HOME,
    payload: {
      data: null,
    },
  });
  home()
    .then((res) => {
      dispatch({
        type: SET_HOME,
        payload: {
          data: res.data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_HOME,
        payload: {
          data: "error",
        },
      });
    });
};

export const getSearch = (text) => (dispatch) => {
  dispatch({
    type: SET_SEARCH,
    payload: {
      data: null,
    },
  });
  search(text)
    .then((res) => {
      dispatch({
        type: SET_SEARCH,
        payload: {
          data: res.data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SEARCH,
        payload: {
          data: "error",
        },
      });
    });
};
