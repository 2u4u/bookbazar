import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { List, Space } from 'antd';
import { showPodcasts, deletePodcast } from "../../redux/actions/podcastAction";
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import Wrapper from "../admin/Wrapper";

function ListPodcasts(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const podcasts = useSelector(state => state.podcast.podcasts);

  useEffect(() => {
    dispatch(showPodcasts())
  }, [dispatch]);

  const onDelete = (podcastId) => {
    dispatch(deletePodcast(podcastId));
  }

  const onEdit = (podcastId) => {
    history.push(`/admin/podcast/view/${podcastId}`);
  }
  return (
    <Wrapper title="List of all podcasts">
      <List
        size="small"
        bordered
        dataSource={podcasts.length ? podcasts : []}
        renderItem={podcast => (
          <List.Item>
            <Space direction="vertical">
              <List.Item.Meta
                title={podcast.name}
                description={podcast.description}
              />
              <Space>
                Список рекомендаций - {podcast.recommendations.length}
                <EyeOutlined onClick={() => onEdit(podcast._id)} />
                <DeleteOutlined style={{ color: "red" }} onClick={() => onDelete(podcast._id)} />
              </Space>
            </Space>
          </List.Item>
        )}
      />
    </Wrapper >
  )
}
export default ListPodcasts;