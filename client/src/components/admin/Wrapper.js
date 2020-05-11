import React from "react";
import { Layout, PageHeader } from 'antd';
import styles from './admin.module.scss';

const { Content } = Layout;

function Wrapper(props) {
  const routes = props.routes || "";
  const itemRender = props.itemRender;

  return (
    <React.Fragment>
      <PageHeader
        className="site-page-header"
        title={props.title}
        breadcrumb={{ itemRender, routes }}
        style={{ paddingLeft: 0 }}
      />
      <Content className={styles.page}>
        {props.children}
      </Content>
    </React.Fragment>
  )
}
export default Wrapper;