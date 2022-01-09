import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
} from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';

import { withRouter } from '../store/utility';
import * as actions from '../store/actions/Auth';

const SignupForm = (props) => {
    const [form] = Form.useForm();
    let navigate = useNavigate();

    const onFinish = (values, error) => {
        console.log('Received values of form: ', values);
        props.onAuth(values.username, values.email, values.password, values.confirm);
        localStorage.setItem('currentUser', values.username);
        navigate("/");
    };

    return (
        <Form
            style={{ left: '25%', position: 'absolute' }}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                label={<span style={{ color: 'white' }}>Username</span>}
                name="username"
                rules={[
                    {
                        required: true,
                        message: <span style={{ marginLeft: 53 }}>Please enter your username</span>,
                    },
                ]}
            >
                <Input style={{ marginLeft: 53, width:500 }}/>
            </Form.Item>

            <Form.Item
                name="email"
                label={<span style={{ color: 'white' }}>Email</span>}
                rules={[
                    {
                        type: 'email',
                        message: <span style={{ marginLeft: 82 }}>The input is not valid E-mail!</span>
                    },
                    {
                        required: true,
                        message: <span style={{ marginLeft: 82 }}>Please input your E-mail!</span>
                    },
                ]}
            >
                <Input style={{ marginLeft: 82, width:500 }}/>
            </Form.Item>

            <Form.Item
                name="password"
                label={<span style={{ color: 'white' }}>Password</span>}
                rules={[
                    {
                        required: true,
                        message: <span style={{ marginLeft: 58 }}>Please input your password!</span>
                    },
                ]}
                hasFeedback
            >
                <Input.Password style={{ marginLeft: 58, width:500 }}/>
            </Form.Item>

            <Form.Item
                name="confirm"
                label={<span style={{ color: 'white' }}>Confirm Password</span>}
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: <span style={{ marginLeft: 5 }}>Please confirm your password!</span>
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password style={{ marginLeft: 5, width:500 }}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginRight: "10px" }}>
                    Login
                </Button>
                <br/>
                <br/>
                <span style={{ color: 'white' }}>Already a user?</span>
                <NavLink style={{ marginRight: "10px" }} to="/login/">
                    &nbsp;Login
                </NavLink>
            </Form.Item>
        </Form>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => {
            dispatch(actions.authSignup(username, email, password1, password2));
            localStorage.setItem('currentUser', username);
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupForm));