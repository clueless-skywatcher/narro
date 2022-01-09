import 'antd/dist/antd.css';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './Routes';
import CustomLayout from './container/CustomLayout';
import * as actions from './store/actions/Auth';

class App extends React.Component {
    componentDidMount(){
        document.body.style.backgroundColor = "#39024d";
        this.props.onTryAutoSignup();
    }
    render(){
        return (
            <div className="App">
                <BrowserRouter>
                    <CustomLayout {...this.props}>
                        <BaseRouter />
                    </CustomLayout>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
