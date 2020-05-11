import React from "react";
import { useSelector } from "react-redux";
import { Form, Select } from 'antd';
const { Option } = Select;

function SelectBook(props) {
  let { onSelectChange, books, authors, book, author } = props;
  const error = useSelector(state => state.error);

  let filteredBooks = books.filter(book1 => !props.rec.some(book2 => {
    return book1._id === book2.book
  }));

  return (
    <Form
      layout={"vertical"}
      style={{ width: "100%" }}
    >
      <Form.Item
        label={"Author name"}
        validateStatus={error.name ? "error" : ""}
        help={error.name}
      >
        <Select
          showSearch
          name="author"
          placeholder="Select author"
          optionFilterProp="children"
          onChange={onSelectChange}
          value={author}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {authors.map(author => {
            return <Option key={author._id} type="author" value={author.name}>{author.name}</Option>
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label={"Book name"}
        validateStatus={error.name ? "error" : ""}
        help={error.name}
      >
        <Select
          showSearch
          name="book"
          placeholder="Select book"
          optionFilterProp="children"
          onChange={onSelectChange}
          value={book}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {filteredBooks.map(book => {
            return <Option key={book._id} type="book" value={book.name}>{book.name}</Option>
          })}
        </Select>
      </Form.Item>
    </Form>
  )
}
export default SelectBook;