import { SHOW_ALL_AUTHORS } from "../types"

const initialState = {
  authors: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_ALL_AUTHORS:
      return {
        ...state,
        authors: action.payload,
      };
    default:
      return state;
  }
}
