import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import podcastReducer from "./podcastReducer"
import bookReducer from "./bookReducer";
import authorReducer from "./authorReducer";

export default combineReducers({
  book: bookReducer,
  author: authorReducer,
  podcast: podcastReducer,
  auth: authReducer,
  error: errorReducer,
});
