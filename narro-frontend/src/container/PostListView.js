import React from 'react';

import axios from 'axios';

import Posts from '../components/Posts';

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        title: `ant design part ${i}`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

class PostList extends React.Component {
    state = {
        posts: []
    }

    componentDidMount(){
        axios.get("http://127.0.0.1:8000/api/v1/posts/epsilonator/").then(
            res => {
                this.setState({
                    posts: res.data
                })
            }
        );
    }

    render(){
        return (
            <Posts data={this.state.posts}/>
        )
    }
}

export default PostList;