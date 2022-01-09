import React from 'react';

import { Row, Col, Slider, Card } from 'antd';
import axios from 'axios';

import '../styles/Cosmetics.css';

const gutters = {};
const vgutters = {};
const colCounts = {};

[8, 16, 24, 32, 40, 48].forEach((value, i) => {
    gutters[i] = value;
});
[8, 16, 24, 32, 40, 48].forEach((value, i) => {
    vgutters[i] = value;
});
[2, 3, 4, 6, 8, 12].forEach((value, i) => {
    colCounts[i] = value;
});

class ProfileCards extends React.Component {
    state = {
        cards: [],
        gutterKey: 1,
        vgutterKey: 1,
        colCountKey: 2,
        breadcrumb: "Select your profile card",
    }

    componentDidMount(){
        const username = localStorage.getItem('currentUser')
        axios.get(`http://127.0.0.1:8000/api/v1/user/${username}/profile_cards/`).then(
            res => {
                this.setState({
                    cards: res.data
                })
            }
        );
    }

    changeProfileCard(profile_card, user){
        axios.post(
            "http://127.0.0.1:8000/api/v1/set_profile_card/", 
            {
                ProfCard: profile_card,
                User: user
            }
        ).then(
            res => {
                if (res.status == 200){
                    window.location = `/user/${user}`;
                }               
            }
        )
    }

    render() {
        const { gutterKey, vgutterKey, cards } = this.state;
        const colCount = 5;
        const { Meta } = Card;
        var data = cards;
        var rows = []
        const username = localStorage.getItem('currentUser')
        for (let i = 0; i < data.length; i += colCount){
            var cols = [];
            for (let j = 0; j < colCount; j += 1){
                if (i + j < data.length) {
                    cols.push(
                        <Col key={i + j} span={24 / colCount}>
                            <div onClick={() => this.changeProfileCard(data[i + j].ProfCardName, username)}>
                                <Card 
                                    hoverable
                                    bordered={false}
                                    className="prof-card"
                                    cover={<img 
                                        alt="example" 
                                        src={data[i + j].ProfCardImgURL}
                                    />}
                                >
                                    <Meta 
                                        title={data[i + j].ProfCardName}/>
                                </Card>
                            </div>
                        </Col>
                    )
                }
            }
            rows.push(cols)
        }

        return (
            <>
                <Row gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>
                    {rows}
                </Row>                
            </>
        );
    }
}

export default ProfileCards;