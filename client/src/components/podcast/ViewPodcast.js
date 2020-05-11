import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Wrapper from "../admin/Wrapper";
import { showPodcast } from "../../redux/actions/podcastAction";
import { List, Row, Col, Button, Space } from 'antd';
import styles from './item.module.scss';


function ViewPodcast() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const pathArr = location.pathname.split("/");
  const path = pathArr[pathArr.length - 1];
  const detailedPodcast = useSelector(state => state.podcast.detailed_podcast);

  const onEdit = () => {
    history.push({
      pathname: `/admin/podcast/edit`,
      state: { post: detailedPodcast }
    });
  }

  const onDelete = (postId) => {
    // dispatch(deleteItem(postId));
    history.push({
      pathname: `/admin/item/list`,
      state: { post: detailedPodcast }
    });
  }

  useEffect(() => {
    dispatch(showPodcast(path))
  }, [path, dispatch]);

  const routes = [{
    path: 'list',
    breadcrumbName: 'List of all podcasts',
  }, {
    breadcrumbName: 'Podcast view',
  }];

  const itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span> :
      <Link to={("../" + paths)}> {route.breadcrumbName}</Link >;
  }

  return (
    <Wrapper title={detailedPodcast.name} routes={routes} itemRender={itemRender}>
      <Row gutter={16}>
        <Col span={24}>
          <div>
            <p >{detailedPodcast.description}</p>
            <List
              size="small"
              bordered
              dataSource={detailedPodcast.recommendations ? detailedPodcast.recommendations : []}
              renderItem={recommendation => (
                <List.Item>
                  <span style={{ color: recommendation.book_text !== "Deleted" ? "inherit" : "red" }}>{recommendation.book_text}</span> - <span style={{ color: recommendation.author_text !== "Deleted" ? "inherit" : "red" }}>{recommendation.author_text}</span>
                </List.Item>
              )}
            />
            <div className={styles.button_wrapper}>
              <Space>
                <Button type="default" onClick={onEdit}>Edit</Button>
                <Button type="primary" danger onClick={() => onDelete(detailedPodcast._id)}>Delete</Button>
              </Space>
            </div>
          </div>
        </Col>
      </Row>
    </Wrapper>
  )
}
export default ViewPodcast;