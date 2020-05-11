import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Menu } from 'antd';
import { FolderOutlined, FileAddOutlined, FileImageOutlined, } from '@ant-design/icons';
import styles from './admin.module.scss';
const { SubMenu } = Menu;

function Sidebar() {
  const location = useLocation();
  const pathArr = location.pathname.split("/");
  const path = pathArr[pathArr.length - 1];

  return (
    <React.Fragment>
      <div className={styles.sidebar__header}></div>
      <Menu
        defaultSelectedKeys={[path]}
        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        mode="inline"
        theme="dark"
      >
        <SubMenu
          key="sub1"
          title={<span><FileImageOutlined /><span>Podcasts</span></span>}
        >
          <Menu.Item key="podcast-add">
            <FileAddOutlined />
            <Link to="/admin/podcast/add">Add new podcast</Link>
          </Menu.Item>
          <Menu.Item key="item-list">
            <FolderOutlined />
            <Link to="/admin/podcast/list">List of all podcast</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={<span><FileImageOutlined /><span>Books</span></span>}
        >
          <Menu.Item key="book-add">
            <FileAddOutlined />
            <Link to="/admin/book/add">Add new book</Link>
          </Menu.Item>
          <Menu.Item key="books-list">
            <FolderOutlined />
            <Link to="/admin/book/list">List of all books</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={<span><FileImageOutlined /><span>Authors</span></span>}
        >
          <Menu.Item key="authors-list">
            <FolderOutlined />
            <Link to="/admin/author/list">List of all authors</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </React.Fragment>
  )
}
export default Sidebar;