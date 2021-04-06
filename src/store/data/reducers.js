import {
  SET_COLOR_SCHEME,
  SET_SNACKBAR,
  SET_HOME,
  SET_SEARCH,
  SET_IS_NOTIFICATIONS_ENABLED,
  SET_IS_ONBOARDING_VIEWED,
  SET_ACTIVE_ROOM,
  SET_CATEGORY,
} from "./actionTypes";

const initialState = {
  colorScheme: "client_light",
  isOnboardingViewed: true,
  snackbar: null,
  activeRoom: null,
  hubCategories: {
    0: "📚 Knowledge",
    1: "🚀 Tech",
    2: "👋 Language",
    3: "🌼 Life",
    4: "🌿 Wellness",
    5: "🎉 Hanging out",
    6: "👱 Identity",
    7: "🎥 Entertainment",
    8: "🏅 Sports",
    9: "🎨 Arts",
    10: "🔥 Hustle",
    11: "🌍 World Affairs",
    12: "🕊️ Faith",
    13: "🎙️ Others",
  },
  home: null,
  search: null,
  category: null,
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME: {
      return {
        ...state,
        home: action.payload.data,
      };
    }
    case SET_ACTIVE_ROOM: {
      return {
        ...state,
        activeRoom: action.payload.data,
      };
    }
    case SET_CATEGORY: {
      return {
        ...state,
        category: action.payload.data,
      };
    }
    case SET_SEARCH: {
      return {
        ...state,
        search: action.payload.data,
      };
    }
    case SET_COLOR_SCHEME: {
      return {
        ...state,
        colorScheme: action.payload.data,
      };
    }
    case SET_SNACKBAR: {
      return {
        ...state,
        snackbar: action.payload.data,
      };
    }
    case SET_IS_ONBOARDING_VIEWED: {
      return {
        ...state,
        isOnboardingViewed: action.payload.data,
      };
    }
    case SET_IS_NOTIFICATIONS_ENABLED: {
      return {
        ...state,
        isNotificationsEnabled: action.payload.data,
      };
    }
    default: {
      return state;
    }
  }
};
