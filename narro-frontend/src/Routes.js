import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PostList from './container/PostListView';
import Profile from './components/Profile';
import ProfileCards from './components/ProfileCards';
import Sigils from './components/Sigils';
import PostDetail from './components/PostDetail';
import LoginForm from './container/LoginForm';
import SignupForm from './container/SignupForm';

const BaseRouter = () => (
    <div>
        <Routes>
            <Route exact path='/' element={<PostList />}/>
            <Route exact path='/post/:postId/' element={<PostDetail />}/>
            <Route exact path='/profilecards/' element={<ProfileCards />}/>
            <Route exact path='/sigils/' element={<Sigils />}/>
            <Route path='/user/:userName/' element={<Profile />}/>
            <Route path='/login/' element={<LoginForm />}/>
            <Route path='/signup/' element={<SignupForm />}/>
        </Routes>
    </div>
);

export default BaseRouter;