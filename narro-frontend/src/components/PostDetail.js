import React, { useEffect, useState } from 'react';
import { List, Space } from 'antd';
import { MessageOutlined, LikeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetail = (props) => {
    const { postId } = useParams();
    const [ post, setPost ] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/v1/post/${postId}/`).then(
            (res) => {
                setPost(res.data);
            }
        )
    }, []);

    const IconText = ({ icon, text }) => (
        <Space style={{ color: 'white' }}>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    return (
        <List
            itemLayout="vertical"
            size="large"
            dataSource={[post]}
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
                        {console.log(item.PostID)}
                        <List.Item.Meta
                            title={item.PostTitle}
                            description={
                                <div>
                                    <span style={{ color: 'white' }}>Posted by:&nbsp;</span>
                                    <a href={`/user/${item.Author?.UserName}/`}>{item.Author?.UserName}</a>
                                    &nbsp;&nbsp;&nbsp;
                                    <img src={item.Author?.UserSigil?.SigilImgURL} height="32" width="32" />
                                    <img src={item.Author?.UserProfileCard?.ProfCardImgURL} height="33" width="129" />
                                </div>
                            }
                        />
                        {<div dangerouslySetInnerHTML={{ __html: post.PostContent }} />}
                    </List.Item>
                </div>
            )}
        />
    )
}

export default PostDetail;