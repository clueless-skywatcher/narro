import React from 'react';

import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import '../styles/Cosmetics.css';
import { withRouter } from '../store/utility';

const IconText = ({ icon, text }) => (
    <Space style={{ color: 'white' }}>
        {React.createElement(icon)}
        {text}
    </Space>
);

const Posts = (props) => {
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={
                {
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                }
            }
            dataSource={props.data}
            pagination={false}
            renderItem={item => (
                <div>
                    <List.Item
                        style={{ color: 'white', borderColor: 'white' }}
                        key={item.PostTitle}
                        actions={[
                            <IconText icon={LikeOutlined} text={item.PostVotes} key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text="" key="list-vertical-message" />,
                        ]}
                    >
                        <List.Item.Meta
                            title={<a href={`/post/${item.PostID}/`} style={{ color: 'white', fontSize: 25 }}>{item.PostTitle}</a>}
                            description={
                                <div>
                                    <span style={{ color: 'white' }}>Posted by:&nbsp;</span>
                                    <a href={`/user/${item.Author.UserName}/`}>{item.Author.UserName}</a>
                                    &nbsp;&nbsp;&nbsp;
                                    <img src={item.Author.UserSigil.SigilImgURL} height="32" width="32" />
                                    &nbsp;<img src={item.Author.UserProfileCard.ProfCardImgURL} height="33" width="129" />
                                </div>
                            }
                        />
                        {<div dangerouslySetInnerHTML={{ __html: item.PostContent }} />}
                    </List.Item>
                </div>
            )}
        />
    )
}

export default withRouter(Posts);