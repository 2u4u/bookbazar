import {
  PODCAST_LOADING,
  SHOW_ALL_PODCASTS,
  PODCAST_NOTIFICATION,
  SHOW_DETAILED_PODCAST
} from "../types"

const initialState = {
  loading: false,
  podcasts: [],
  detailed_podcast: {},
  podcast_notification: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PODCAST_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SHOW_ALL_PODCASTS:
      return {
        ...state,
        podcasts: action.payload,
        loading: false
      };
    case SHOW_DETAILED_PODCAST:
      return {
        ...state,
        detailed_podcast: action.payload,
        loading: false
      };
    case PODCAST_NOTIFICATION:
      return {
        ...state,
        podcast_notification: action.payload
      }
    default:
      return state;
  }
}
