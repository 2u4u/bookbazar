import React from "react";
import Wrapper from "../admin/Wrapper";
import AddBookForm from "./AddBookForm";

function AddBook() {
  return (
    <Wrapper title="Add new book">
      <AddBookForm />
    </Wrapper>
  )
}
export default AddBook;