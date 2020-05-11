import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, List, Form, Input, Button, Select, notification, Alert, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addPodcast, clearErrors } from "../../redux/actions/podcastAction";
import { showAuthors } from "../../redux/actions/authorAction";
import { showBooks, showBooksByAuthor } from "../../redux/actions/bookAction";
import SelectBook from "./SelectBook";
import { DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

function AddPodcastForm(props) {
  const { item } = props;
  const dispatch = useDispatch();
  const loading = useSelector(state => state.podcast.loading);
  const podcast_notification = useSelector(state => state.podcast.podcast_notification);
  const error = useSelector(state => state.error);
  const books = useSelector(state => state.book.books);
  const authors = useSelector(state => state.author.authors);

  const [state, setState] = useState({
    handle: item ? item.handle : "",
    id: item ? item._id : "",
    name: item ? item.name : "",
    authors: ['Галина Юзефович', 'Анастасия Завозова'],
    description: item ? item.description : "",
    recommendations: item ? item.recommendations : []
  });

  const [stateModal, setStateModal] = useState(false);

  const showModal = () => setStateModal(true);
  const closeModal = () => setStateModal(false);

  const modalSubmit = () => {
    let newRecommendation = {
      author: state.author,
      book: state.book,
      author_text: state.author_text,
      book_text: state.book_text
    }
    setState(state => ({
      ...state,
      author: "",
      book: "",
      author_text: "",
      book_text: "",
      recommendations: [...state.recommendations, newRecommendation]
    }))
    setStateModal(false);
  }

  const onSelectChange = (value, options) => {
    const { key, type } = options
    setState(state => ({
      ...state,
      [type + "_text"]: value,
      [type]: key
    }))
    if (type === "author") dispatch(showBooksByAuthor(key))
  }

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setState(state => ({ ...state, [name]: value }))
    dispatch(clearErrors())
  }

  const onDelete = (recDel) => {
    let recommendations = state.recommendations.filter(recItem => recItem.book !== recDel)
    setState(state => ({
      ...state,
      recommendations
    }))
  }

  const onSubmit = () => {
    const newPodcast = {
      handle: state.handle,
      id: state.id,
      name: state.name,
      authors: state.authors,
      description: state.description,
      recommendations: state.recommendations
    };
    dispatch(addPodcast(newPodcast));
  }

  useEffect(() => {
    dispatch(showAuthors())
    dispatch(showBooks())
    if (podcast_notification && podcast_notification.text) {
      notification[podcast_notification.type]({
        message: <span>{podcast_notification.title}</span>,
        description: <span>{podcast_notification.text}</span>,
      });
    }
    return () => {
      dispatch(clearErrors())
    }
  }, [podcast_notification, dispatch]);

  return (
    <React.Fragment>
      <Form
        onFinish={onSubmit}
        layout={"vertical"}
        style={{ width: "800px", margin: "auto" }}
      >
        <Form.Item
          label={"Name of podcast"}
          validateStatus={error.name ? "error" : ""}
          help={error.name}
        >
          <Input
            onChange={e => onInputChange(e)}
            placeholder="Set podcast name"
            name="name"
            type="text"
            value={state.name}
          />
        </Form.Item>
        <Form.Item label={"Description of podcast"}>
          <TextArea
            rows={4}
            name="description"
            placeholder={"Please put here podcast description"}
            type="description"
            onChange={e => onInputChange(e)}
            value={state.description}
          />
        </Form.Item>
        <Form.Item label={"Select keynotes"}>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="select person"
            defaultValue={['galina', 'nastya']}
            // onChange={TODO}
            optionLabelProp="label"
          >
            <Option value="galina" label="Галина Юзефович">
              <div className="demo-option-label-item">Галина Юзефович</div>
            </Option>
            <Option value="nastya" label="Анастасия Завозова">
              <div className="demo-option-label-item">Анастасия Завозова</div>
            </Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <List
            header={<div>Recommendations</div>}
            footer={<Button
              htmlType="button"
              onClick={showModal}
            >
              <PlusOutlined />
              Add recommendation
            </Button>}
            bordered
            dataSource={state.recommendations}
            renderItem={item => (
              <List.Item>
                <Space>
                  <span style={{ color: item.book_text !== "Deleted" ? "inherit" : "red" }}>{item.book_text}</span> - <span style={{ color: item.author_text !== "Deleted" ? "inherit" : "red" }}>{item.author_text}</span>
                  <DeleteOutlined style={{ color: "red" }} onClick={() => onDelete(item.book)} />
                </Space>
              </List.Item>
            )}
          />
        </Form.Item>

        {error.summary ? <Alert style={{ marginBottom: "1em" }} message={error.summary} type="error" /> : ""}

        <Form.Item>
          <Button type="primary" loading={loading} htmlType="submit">{loading ? "Loading" : "Submit"}</Button>
        </Form.Item>
      </Form>
      <Modal
        title="Add book"
        visible={stateModal}
        onOk={modalSubmit}
        okText="Add book"
        onCancel={closeModal}
      >
        <SelectBook
          onSelectChange={onSelectChange}
          books={books}
          authors={authors}
          book={state.book_text}
          author={state.author_text}
          rec={state.recommendations}
        />
      </Modal>
    </React.Fragment>
  )
}
export default AddPodcastForm;