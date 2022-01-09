import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';

import { PageHeader, Menu, Dropdown, Button, Tag, Typography, Row } from 'antd';
import { useParams } from 'react-router-dom';

import '../styles/Profile.css';

const Profile = () => {
    const { userName } = useParams();
    const [user, setUser] = useState([]);

    console.log("Rendering...")    

    const IconLink = ({ href, text }) => (
        <a
            href={href}
            className="example-link">
            {text}
        </a>
    );

    const content = (
        <>
            <div>
                <IconLink
                    href="/profilecards/"
                    text="Change Profile Card"
                />&nbsp;&nbsp;&nbsp;&nbsp;
                <IconLink
                    href="/sigils/"
                    text="Change Sigil"
                />
            </div>
        </>
    );

    const Content = ({ children, extraContent }) => (
        <Row>
            <div style={{ flex: 1 }}>
                {children}
                <br/>
                <br/>
                <div style={{ color: 'white' }}>{user.Description}</div>
                <br/>
                <div style={{ color: 'white' }}><b>Hometown: </b>{user.Hometown}</div>
            </div>
        </Row>
    );

    useEffect(() => 
        {
            axios.get(`http://127.0.0.1:8000/api/v1/user/${userName}/`, {}, {
                auth: {
                    username: 'epsilonator',
                    password: 'admin'
                }
            }).then(
                (res) => {
                    setUser(res.data);
                }
            )
        }
    , [])

    return (
        <PageHeader
            title={
                <div style={{ fontSize: 40, height: 50, color: 'white' }}>
                    {user.Username}
                </div>
            }
            className="site-page-header"
            tags={
                <img
                    height="65"
                    width="259"
                    src={user.CurrentProfileCosmetics?.CurrentProfileCard?.ProfCardImgURL}
                />
            }
            avatar={{
                size: 96,
                shape: 'square',
                src: user.CurrentProfileCosmetics?.CurrentSigil?.SigilImgURL
            }}
        >
            <Content>
                {content}
            </Content>
        </PageHeader>
    )
}

export default Profile;