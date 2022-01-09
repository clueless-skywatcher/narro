import React from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';

import { withRouter } from '../store/utility';
import * as actions from '../store/actions/Auth';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const LoginForm = (props) => {
    let navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Success:', values);
        props.onAuth(values.username, values.password);
        navigate('/');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    let errorMessage = null;
    if (props.error){
        errorMessage = (
            <p style={{ left: "50%", color: 'white' }}>{props.error.message}</p>
        )
    }

    return (
        <div>
            {errorMessage}
            {
                props.loading ?

                <Spin indicator={antIcon} />

                :

                <Form
                    style={{ left: '25%', position: 'absolute' }}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label={<span style={{ color: 'white' }}>Username&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input style={{ width:500 }}/>
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ color: 'white' }}>Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password style={{ width:500 }}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginRight: "10px" }}>
                            Login
                        </Button>
                        <br/>
                        <br/>
                        <span style={{ color: 'white' }}>Not a user?</span>
                        <NavLink style={{ marginRight: "10px" }} to="/signup/">
                            &nbsp;Signup
                        </NavLink>
                    </Form.Item>
                </Form>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        username: state.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => {
            dispatch(actions.authLogin(username, password));
            localStorage.setItem('currentUser', username);
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));