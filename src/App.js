import React, { Fragment, Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/pages/About';
import User from './components/users/User';

class App extends Component {
    state = {
        users: [],
        user: {},
        loading: false,
        alert: null
    }
    
    // Search all users
    searchUsers = async (text) => {
        this.setState({ loading: true });
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({ users: res.data.items, loading: false });
    }

    // Search specific user
    getUser = async (username) => {
        this.setState({ loading: true });
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({ user: res.data, loading: false });
    }

    // Clear data from page
    clearData = (text) => {
        this.setState({ users: [], loading: false });
    }

    // Alert popup from 
    setAlert = (msg, type) => {
        this.setState({ alert: { msg: msg, type: type } });
        setTimeout(() => this.setState({ alert: null }), 3000);
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar title="Github" github_icon="fab fa-github" ></Navbar>
                    <div className="container">
                        <Alert alert={this.state.alert}></Alert>
                        <Routes>
                            <Route exact path="/" element={
                                <Fragment>
                                    <Search searchUsers={this.searchUsers} setAlert={this.setAlert} clearData={this.clearData} showClear={this.state.users.length > 0 ? true : false} ></Search>
                                    <Users loading={this.state.loading} users={this.state.users} ></Users>
                                </Fragment>
                            }>
                            </Route>

                            <Route exact path="/about" element={<About/>}>
                            </Route>

                            <Route exact path="/user/:login" element={ <User getUser={this.getUser} user={this.state.user} loading={this.state.loading} /> }>
                            </Route>
                        </Routes>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
