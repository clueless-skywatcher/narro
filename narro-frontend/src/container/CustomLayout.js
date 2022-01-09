import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../store/actions/Auth';

import { withRouter } from '../store/utility';
import '../styles/CustomLayout.css';

const { Header, Footer, Sider, Content } = Layout;

class CustomLayout extends React.Component {
    componentDidMount(){
        console.log(localStorage);
        const username = localStorage.getItem('currentUser');
        axios.get(`http://127.0.0.1:8000/api/v1/user/${username}/`, {}, {
            auth: {
                username: 'epsilonator',
                password: 'admin'
            }
        }).then(
            (res) => {
                this.setState(res.data);
            }
        )
    }

    render(){
        return (
            <Layout className="layout">
                <Header className='header'>
                    <Menu className='custom-class' mode="horizontal" >
                        <Menu.Item key="0" disabled={true}><span style={{color: 'white', fontSize: 18}}>Narro</span></Menu.Item>
                        <Menu.Item key="1"><a style={{color: 'white'}} href='/'>Home</a></Menu.Item>
                        <Menu.Item key="2"><a style={{color: 'white'}} href=''>New Post</a></Menu.Item>
                        {
                            this.props.isAuthenticated ?
                            <>
                                <Menu.Item key="3" style={{marginLeft: 'auto'}}>
                                <a style={{color: 'white'}} href={`/user/${this.state?.Username}/`}>
                                    <img height="32" width="32" src={this.state?.CurrentProfileCosmetics?.CurrentSigil?.SigilImgURL} />
                                    &nbsp;&nbsp;{this.state?.Username}
                                </a>
                                </Menu.Item>
                                <Menu.Item key="4" onClick={this.props.logout}>
                                    <span style={{color: 'white'}}>
                                        Logout
                                    </span>
                                </Menu.Item>
                            </>                            

                            :

                            <Menu.Item key="3" style={{marginLeft: 'auto'}}>
                                <a style={{color: 'white', padding: 25}} href='/login/'>
                                    Login
                                </a>
                            </Menu.Item>
                        }
                    </Menu>
                </Header>
                <Content className="content">
                    <div className="site-layout-content">
                        {this.props.children}
                    </div>
                </Content>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(actions.authLogout());
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));
        