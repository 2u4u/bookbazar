import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from 'antd';
import { Layout } from 'antd';
import { showPodcasts, } from "../../redux/actions/podcastAction";
import styles from "./main.module.scss"
const { Content } = Layout;
const { Panel } = Collapse;

function Main() {
  const dispatch = useDispatch();
  const podcasts = useSelector(state => state.podcast.podcasts);

  useEffect(() => {
    dispatch(showPodcasts())
  }, [dispatch]);
  return (
    <Layout className={`${styles.podcasts} ${styles.podcasts_white}`}>
      <Content >
        <div className={styles.podcasts__wrapper}>
          {podcasts.length ?
            <Collapse
              defaultActiveKey={["1"]}
              className={styles.podcast}>
              {podcasts.map(podcast => {
                return (
                  <Panel className={styles.podcast__panel}
                    header={
                      <React.Fragment>
                        <h2 className={styles.podcast__panel_header}>{podcast.name}</h2>
                        <p className={styles.podcast__panel_subheader}>{podcast.authors.join(", ")}</p>
                        <p className={styles.podcast__panel_description}>{podcast.description}</p>
                      </React.Fragment>
                    } key={podcast._id}>
                    {podcast.recommendations.length ?
                      podcast.recommendations.map(recommendation => {
                        return (<div key={recommendation._id} className={styles.podcast__recommend}>
                          <p className={styles.podcast__recommend_book}>{recommendation.book.name}</p>
                          <p className={styles.podcast__recommend_author}>{recommendation.author.name}</p>
                        </div>)
                      }) : ""
                    }
                  </Panel>
                )
              })}
            </Collapse>
            : ""
          }
        </div>
      </Content>
    </Layout>


  )
}
export default Main;