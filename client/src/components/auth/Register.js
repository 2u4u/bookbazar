import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../redux/actions/authAction";
import { Modal, Layout, Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const { Title } = Typography;

const Register = (props) => {
  // const errors = useSelector(state => state.error);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const [state, setState] = useState({
    email: "",
    name: "",
    password: "",
    password2: ""
  });

  const onSubmit = () => {
    const newUser = {
      email: state.email,
      name: state.name,
      password: state.password,
      password2: state.password2
    };

    dispatch(registerUser(newUser, props.history));
  }

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setState(state => ({ ...state, [name]: value }))
  }

  useEffect(() => {
    if (isAuthenticated) props.history.push("/admin")
  }, [props.history, isAuthenticated]);

  //TODO I agree checkbox and terms pages

  return (
    <Layout style={{ height: '100%' }}>
      <Modal
        title={<Title level={3}>Sign up</Title>}
        visible={true}
        centered
        closable={false}
        footer={null}
      >
        <Form
          noValidate
          onFinish={onSubmit}
          className="login-form"
        >
          <Form.Item>
            <Input
              size="large"
              onChange={e => onInputChange(e)}
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Your name"
              type="text"
              name="name"
              value={state.name}
            />
          </Form.Item>
          <Form.Item>
            <Input
              size="large"
              onChange={e => onInputChange(e)}
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Your email"
              type="email"
              name="email"
              value={state.email}
              autoComplete="email"
            />
          </Form.Item>
          <Form.Item>
            <Input
              size="large"
              onChange={e => onInputChange(e)}
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Your password"
              name="password"
              value={state.password}
              autoComplete="password"
            />
          </Form.Item>
          <Form.Item>
            <Input
              size="large"
              onChange={e => onInputChange(e)}
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Repeat password"
              name="password2"
              value={state.password2}
              autoComplete="password"
            />
          </Form.Item>
          <Form.Item>
            <Checkbox>I agree to the <Link to="/login">terms of service</Link> and <Link to="/login">privacy policy</Link></Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={{ width: "100%" }} htmlType="submit" className="login-form-button">
              Get started
            </Button>
          </Form.Item>
          <Form.Item>
            or <Link to="/login">Log in</Link>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}

export default Register;