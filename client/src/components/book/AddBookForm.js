import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, AutoComplete, Button, Alert, notification } from 'antd';
import { addBook, clearErrors } from "../../redux/actions/bookAction";
import { showAuthors } from "../../redux/actions/authorAction";

function AddBookForm(props) {
  const { item } = props;
  const dispatch = useDispatch();
  const book_notification = useSelector(state => state.book.book_notification);
  const authors = useSelector(state => state.author.authors);
  const error = useSelector(state => state.error);
  const [state, setState] = useState({
    handle: item ? item.handle : "",
    id: item ? item._id : "",
    author: item ? item.author : {},
    name: item ? item.name : "",
  });

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setState(state => ({ ...state, [name]: value }))
    dispatch(clearErrors())
  }

  const onAutocompleteChange = (value) => {
    const authorWithId = authors.find((a) => (a.value === value) ? a.id : "");
    setState(state => ({
      ...state, author: {
        id: authorWithId ? authorWithId.id : "",
        value
      }
    }))
  }

  const onSubmit = () => {
    const newAuthor = {
      handle: state.handle,
      id: state.id,
      name: state.name,
      author: state.author,
    };
    dispatch(addBook(newAuthor));
  }

  useEffect(() => {
    dispatch(showAuthors())
    if (book_notification && book_notification.text) {
      notification[book_notification.type]({
        message: <span>{book_notification.title}</span>,
        description: <span>{book_notification.text}</span>,
      });
    }
  }, [dispatch, book_notification]);

  return (
    <Form
      onFinish={onSubmit}
      layout={"vertical"}
      style={{ width: "800px", margin: "auto" }}
    >
      <Form.Item
        label={"Author name"}
        validateStatus={error.name ? "error" : ""}
        help={error.name}
      >
        <AutoComplete
          options={authors.map(author => {
            let obj = {};
            obj.value = author.name
            return obj
          })}
          onChange={e => onAutocompleteChange(e)}
          placeholder="Start typing author name"
          filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        />
      </Form.Item>
      <Form.Item
        label={"Book name"}
        validateStatus={error.book ? "error" : ""}
        help={error.book}
      >
        <Input
          onChange={e => onInputChange(e)}
          placeholder="Set book name"
          name="name"
          type="text"
          value={state.book}
        />

      </Form.Item>
      {error.summary ? <Alert style={{ marginBottom: "1em" }} message={error.summary} type="error" /> : ""}

      <Form.Item>
        <Button type="primary"
          htmlType="submit">
          Submit
          </Button>
        {/* <Button type="dashed" style={{ marginLeft: "1em" }} onClick={onClearForm}>Clear form</Button> */}
      </Form.Item>
    </Form>
  )
}
export default AddBookForm;