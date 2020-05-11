import React, { useEffect } from 'react';
import Sidebar from "./Sidebar";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Row } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css'
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { logoutUser } from "../../redux/actions/authAction";
import styles from './admin.module.scss';

const { Sider, Content, Header } = Layout;


function Admin(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const name = useSelector(state => state.auth.user.name);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const onLogOut = () => {
    dispatch(logoutUser());
  }

  useEffect(() => {
    if (!isAuthenticated) history.push("/login")
  }, [history, props.history, isAuthenticated]);

  return (
    <div className={styles.main}>
      <Layout className={`${styles.layout} ${styles.layout__full}`}>
        <Sider>
          <Sidebar />
        </Sider>
        <Layout>
          <Header style={{ backgroundColor: "#ffffff" }}>
            <Row type="flex" justify="end" align="middle" className={styles.header__wrapper} >
              <Link to="/" target="_blank" className={styles.header__link}>To website</Link>
              {isAuthenticated ?
                <React.Fragment>
                  <span>You are loged in as {name}</span>
                  <LogoutOutlined className={styles.header__login} onClick={onLogOut} />
                </React.Fragment>
                :
                <LoginOutlined className={styles.header__login} />
              }
            </Row>
          </Header>
          <Content>
            <div className={styles.content}>
              {props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}
export default Admin;