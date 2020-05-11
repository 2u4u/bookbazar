import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Space } from 'antd';
import { showAuthors, deleteAuthor } from "../../redux/actions/authorAction";
import { DeleteOutlined } from '@ant-design/icons';
import Wrapper from "../admin/Wrapper";

function ListAuthors(props) {
  const dispatch = useDispatch();
  const authors = useSelector(state => state.author.authors);

  useEffect(() => {
    dispatch(showAuthors())
  }, [dispatch]);

  const onDelete = (authorId) => {
    dispatch(deleteAuthor(authorId));
  }

  return (
    <Wrapper title="List of all authors">
      <List
        size="small"
        bordered
        dataSource={authors.length ? authors : []}
        renderItem={author => (
          <List.Item>
            <Space>
              {author.name}
              {author.name !== "Не указан" ? <DeleteOutlined style={{ color: "red" }} onClick={() => onDelete(author._id)} /> : ""}
            </Space>
          </List.Item>
        )}
      />
    </Wrapper >
  )
}
export default ListAuthors;