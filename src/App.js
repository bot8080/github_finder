// import logo from './logo.svg';
import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
// import UserItem from './components/users/UserItem';
import Users from './components/users/Users';

import './App.css';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar title="Github" github_icon="fab fa-github" ></Navbar>
                <div className="container">
                    <Users></Users>
                </div>
            </div>
        );
    }
}

export default App;
