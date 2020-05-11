import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, List } from 'antd';
import { showBooks, deleteBook } from "../../redux/actions/bookAction";
import { DeleteOutlined } from '@ant-design/icons';
import Wrapper from "../admin/Wrapper";

function ListBooks(props) {
  const dispatch = useDispatch();
  const books = useSelector(state => state.book.books);

  useEffect(() => {
    dispatch(showBooks())
  }, [dispatch]);

  const onDelete = (bookId) => {
    dispatch(deleteBook(bookId));
  }

  return (
    <Wrapper title="List of all books">
      <List
        size="small"
        bordered
        dataSource={books.length ? books : []}
        renderItem={book => (
          <List.Item>
            <Space>
              {book.name} - {book.author.name}
              <DeleteOutlined style={{ color: "red" }} onClick={() => onDelete(book._id)} />
            </Space>
          </List.Item>
        )}
      />
    </Wrapper >
  )
}
export default ListBooks;