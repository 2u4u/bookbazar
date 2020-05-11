import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setCurrentUser, logoutUser } from "../redux/actions/authAction";
import jwt_token from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import store from "../store";

import { PrivateRoute } from "../components/route/PrivateRoute";
// import MainPage from "../components/main/MainPage";
import Main from '../components/main/Main';
import Admin from '../components/admin/Admin';

import ListPodcasts from '../components/podcast/ListPodcasts';
import AddPodcast from '../components/podcast/AddPodcast';
import EditPodcast from '../components/podcast/EditPodcast';
import ViewPodcast from '../components/podcast/ViewPodcast';

import ListAuthors from '../components/author/ListAuthors';

import AddBook from '../components/book/AddBook'
import ListBooks from "../components/book/ListBooks";


if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info
  const decoded = jwt_token(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user if expired
    store.dispatch(logoutUser());

    // Redirect to Login
    // window.location.href = "/login";
  }
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Admin>
          <PrivateRoute exact path="/admin" component={ListPodcasts} />
          {/* <PrivateRoute path="/admin" component={Admin} /> */}
          <PrivateRoute exact path="/admin/podcast/add" component={AddPodcast} />
          <PrivateRoute exact path="/admin/podcast/list" component={ListPodcasts} />
          <PrivateRoute exact path="/admin/podcast/edit" component={EditPodcast} />
          <PrivateRoute exact path="/admin/podcast/view/:itemId" component={ViewPodcast} />
          <PrivateRoute exact path="/admin/author/list" component={ListAuthors} />
          <PrivateRoute exact path="/admin/book/add" component={AddBook} />
          <PrivateRoute exact path="/admin/book/list" component={ListBooks} />
        </Admin>
      </Switch>
    </Router>
  );
}

export default App;
