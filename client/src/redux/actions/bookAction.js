import axios from "axios";
import { GET_ERRORS, BOOK_LOADING, SHOW_ALL_BOOKS, BOOK_NOTIFICATION } from "../types";

// Add item
export const addBook = (itemData) => dispatch => {
  dispatch({ type: BOOK_LOADING, payload: true })
  axios
    .post("/api/books/add", itemData)
    .then(res => {
      dispatch({ type: BOOK_LOADING, payload: false })
      dispatch({ type: BOOK_NOTIFICATION, payload: { active: true, type: "success", title: "Successfully added", text: "You have successfully added your book" } })
      dispatch({ type: GET_ERRORS, payload: {} })
      setTimeout(() =>
        dispatch({ type: BOOK_NOTIFICATION, payload: { active: false, type: "", title: "", text: "" } })
        , 1000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err && err.response && err.response.data
      })
      dispatch({ type: BOOK_LOADING, payload: false })
    });
};

// Clear errors
export const clearErrors = () => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: {}
  })
}

// Show all books
export const showBooks = () => dispatch => {
  axios
    .get(`/api/books/all`)
    .then(res => dispatch({ type: SHOW_ALL_BOOKS, payload: res.data }))
    .catch(err => console.log("err", err));
};

// Show books by author
export const showBooksByAuthor = (authorId) => dispatch => {
  axios
    .get(`/api/books/author/${authorId}`)
    .then(res => dispatch({ type: SHOW_ALL_BOOKS, payload: res.data }))
    .catch(err => console.log("err", err));
};

// Delete item
export const deleteBook = (bookId) => dispatch => {
  axios
    .delete(`/api/books/${bookId}`)
    .then(res => dispatch(showBooks()))
    .catch(err => console.log("err", err));
};