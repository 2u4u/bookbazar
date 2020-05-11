import React from "react";
import { useLocation } from "react-router-dom";
import Wrapper from "../admin/Wrapper";
import AddPodcastForm from "./AddPodcastForm";

function Edit() {
  const location = useLocation();
  const { post } = location.state;

  return (
    <Wrapper title="Edit item">
      <AddPodcastForm item={post} />
    </Wrapper>
  )
}
export default Edit;