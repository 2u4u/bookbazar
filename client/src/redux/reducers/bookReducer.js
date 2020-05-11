import { BOOK_LOADING, SHOW_ALL_BOOKS, BOOK_NOTIFICATION, SHOW_DETAILED_BOOK } from "../types"

const initialState = {
  loading: false,
  books: [],
  book_notification: {},
  detailed_book: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case BOOK_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SHOW_ALL_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false
      };
    case BOOK_NOTIFICATION:
      return {
        ...state,
        book_notification: action.payload
      }
    case SHOW_DETAILED_BOOK:
      return {
        ...state,
        detailed_book: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
