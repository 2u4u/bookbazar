import axios from "axios";
import { GET_ERRORS, SHOW_DETAILED_PODCAST, PODCAST_NOTIFICATION, SHOW_ALL_PODCASTS, PODCAST_LOADING } from "../types";

// Add post
export const addPodcast = (itemData) => dispatch => {
  dispatch({ type: PODCAST_LOADING, payload: true })
  axios
    .post("/api/podcasts/add", itemData)
    .then(res => {
      dispatch({ type: PODCAST_LOADING, payload: false })
      dispatch({ type: PODCAST_NOTIFICATION, payload: { active: true, type: "success", title: "Successfully added", text: "You have successfully added you post" } })
      dispatch({ type: GET_ERRORS, payload: {} })
      setTimeout(() =>
        dispatch({ type: PODCAST_NOTIFICATION, payload: { active: false, type: "", title: "", text: "" } })
        , 1000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      dispatch({ type: PODCAST_LOADING, payload: false })
    });
};

// Clear errors
export const clearErrors = () => dispatch => {
  dispatch({ type: GET_ERRORS, payload: {} })
}

// Show all podcasts
export const showPodcasts = () => dispatch => {
  axios
    .get("/api/podcasts/all")
    .then(res => dispatch({ type: SHOW_ALL_PODCASTS, payload: res.data }))
    .catch(err => console.log("err", err));
};


// Delete post
export const deletePodcast = (podcastId) => dispatch => {
  axios
    .delete(`/api/podcasts/${podcastId}`)
    .then(res => dispatch(showPodcasts()))
    .catch(err => console.log("err", err));
};

// Show podcast
export const showPodcast = (podcastId) => dispatch => {
  axios
    .get(`/api/podcasts/detailed/${podcastId}`)
    .then(res => {
      dispatch({
        type: SHOW_DETAILED_PODCAST,
        payload: res.data
      })
    })
    .catch(err => console.log("err", err));
};
