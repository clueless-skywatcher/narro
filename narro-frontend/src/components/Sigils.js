import React from 'react';

import { Row, Col, Slider } from 'antd';
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

class Sigils extends React.Component {
    state = {
        sigils: [],
        gutterKey: 1,
        vgutterKey: 1,
        breadcrumb: "Select your sigil"
    }

    componentDidMount(){
        axios.get("http://127.0.0.1:8000/api/v1/user/epsilonator/sigils/").then(
            res => {
                this.setState({
                    sigils: res.data
                })
            }
        );
    }

    changeSigil(sigil, user){
        axios.post(
            "http://127.0.0.1:8000/api/v1/set_sigil/", 
            {
                Sigil: sigil,
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
        const { gutterKey, vgutterKey, sigils } = this.state;
        const colCount = 8;
        
        var data = sigils;
        var rows = []

        for (let i = 0; i < data.length; i += colCount){
            var cols = [];
            for (let j = 0; j < colCount; j += 1){
                if (i + j < data.length) {
                    cols.push(
                        <Col key={i + j} span={3}>
                            <div className="sigil" onClick={() => this.changeSigil(data[i + j].SigilName, 'epsilonator')}>
                                <img className='sigil-img' src={data[i + j].SigilImgURL}/><br/>
                                <a style={{ textAlign: 'justify' }}>{data[i + j].SigilName}</a>
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

export default Sigils;