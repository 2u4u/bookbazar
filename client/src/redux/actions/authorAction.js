import axios from "axios";
import { SHOW_ALL_AUTHORS } from "../types";

// Show all items
export const showAuthors = () => dispatch => {
  axios
    .get(`/api/authors/all`)
    .then(res => dispatch({ type: SHOW_ALL_AUTHORS, payload: res.data }))
    .catch(err => console.log("err", err));
};

// Delete author
export const deleteAuthor = (authorId) => dispatch => {
  axios
    .post(`/api/authors/delete/${authorId}`)
    .then(res => dispatch(showAuthors()))
    .catch(err => console.log("err", err));
};
