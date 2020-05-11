import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../redux/actions/authAction";
import { Layout, Modal, Form, Input, Button, Checkbox, Typography, } from 'antd';

import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

function Login(props) {
  // const errors = useSelector(state => state.error);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const [state, setState] = useState({
    email: "",
    password: "",
    open: true
    // errors: errors
  });

  const onSubmit = () => {
    const user = {
      email: state.email,
      password: state.password
    };

    dispatch(loginUser(user));
  }

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setState(state => ({ ...state, [name]: value }))
  }

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/admin")
    }
  }, [props.history, isAuthenticated]);

  //TODO remember me checkbox
  return (
    <Layout style={{ height: '100%' }}>
      <Modal
        title={<Title level={3}>Log in</Title>}
        visible={state.open}
        centered
        closable={false}
        footer={null}
      >
        <Form
          className="login-form"
          noValidate
          onFinish={onSubmit}
        >
          <Form.Item>
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Your email"
              onChange={e => onInputChange(e)}
              type="text"
              name="email"
              value={state.email}
              autoComplete="email"
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Your password"
              onChange={e => onInputChange(e)}
              name="password"
              value={state.password}
              autoComplete="password"
            />
          </Form.Item>
          <Form.Item>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={{ width: "100%" }} htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
          <Form.Item>
            or <Link to="/register">Sign up!</Link>
          </Form.Item>
        </Form>

      </Modal >
    </Layout >
  )
}
export default Login;